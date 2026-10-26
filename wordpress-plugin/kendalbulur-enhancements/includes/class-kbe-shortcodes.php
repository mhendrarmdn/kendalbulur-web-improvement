<?php
if (!defined('ABSPATH')) exit;

class KBE_Shortcodes {
    private static $assets=false;

    public static function init() {
        add_shortcode('kb_agenda',[__CLASS__,'agenda']);
        add_shortcode('kb_potensi',[__CLASS__,'potensi']);
        add_shortcode('kb_regulasi',[__CLASS__,'regulasi']);
        add_shortcode('kb_rtrw',[__CLASS__,'rtrw']);
        add_shortcode('kb_simpeldesa',[__CLASS__,'simpeldesa']);
        add_shortcode('kb_data_warga',[__CLASS__,'data_warga']);
        add_shortcode('kb_idm',[__CLASS__,'idm']);
    }

    private static function assets() {
        if (self::$assets) return;
        wp_enqueue_style('kbe-frontend',KBE_URL.'assets/css/frontend.css',[],KBE_VERSION);
        wp_enqueue_script('kbe-frontend',KBE_URL.'assets/js/frontend.js',[],KBE_VERSION,true);
        self::$assets=true;
    }

    private static function q($type,$args=[]) {
        return new WP_Query(array_merge([
            'post_type'=>$type,
            'post_status'=>'publish',
            'posts_per_page'=>-1,
            'no_found_rows'=>true,
        ],$args));
    }

    public static function agenda() {
        self::assets();
        $q=self::q('kb_agenda',[
            'meta_key'=>'kb_start',
            'orderby'=>'meta_value',
            'order'=>'ASC'
        ]);
        ob_start(); ?>
        <section class="kb-enhancement kb-agenda" data-kbe-agenda>
            <div class="kb-filterbar">
                <label>Bulan<select data-kbe-month><option value="all">Semua bulan</option><?php
                    $months=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
                    foreach($months as $i=>$m) echo '<option value="'.esc_attr($i+1).'">'.esc_html($m).'</option>';
                ?></select></label>
                <label>Tahun<select data-kbe-year><option value="all">Semua tahun</option></select></label>
                <label>Status<select data-kbe-status><option value="all">Semua status</option><option value="upcoming">Mendatang</option><option value="active">Sedang berlangsung</option><option value="done">Selesai</option></select></label>
                <input type="search" data-kbe-search placeholder="Cari agenda...">
            </div>
            <div class="kb-list kb-agenda-list">
            <?php if($q->have_posts()): while($q->have_posts()): $q->the_post();
                $id=get_the_ID();
                $start=get_post_meta($id,'kb_start',true);
                $end=get_post_meta($id,'kb_end',true);
                $loc=get_post_meta($id,'kb_location',true);
                $cat=get_post_meta($id,'kb_category',true);
                $excerpt=wp_strip_all_tags(get_the_excerpt() ?: get_the_content());
                $date=$start ? wp_date('d M Y H:i',strtotime($start)) : '';
                ?>
                <button type="button" class="kb-agenda-item"
                    data-kbe-event
                    data-title="<?php echo esc_attr(get_the_title()); ?>"
                    data-start="<?php echo esc_attr($start); ?>"
                    data-end="<?php echo esc_attr($end); ?>"
                    data-location="<?php echo esc_attr($loc); ?>"
                    data-category="<?php echo esc_attr($cat); ?>"
                    data-description="<?php echo esc_attr($excerpt); ?>">
                    <span class="kb-agenda-date"><?php echo esc_html($date); ?></span>
                    <strong><?php the_title(); ?></strong>
                    <small><?php echo esc_html($loc); ?></small>
                </button>
            <?php endwhile; wp_reset_postdata(); else: ?>
                <p class="kb-empty">Belum ada agenda. Tambahkan dari Dashboard WordPress → Agenda.</p>
            <?php endif; ?>
            </div>
            <?php self::modal_markup(); ?>
        </section>
        <?php return ob_get_clean();
    }

    private static function modal_markup() { ?>
        <div class="kb-modal" data-kbe-modal aria-hidden="true">
            <div class="kb-modal-card" role="dialog" aria-modal="true">
                <button type="button" class="kb-modal-close" data-kbe-close aria-label="Tutup">×</button>
                <span class="kb-status" data-kbe-modal-status></span>
                <h3 data-kbe-modal-title></h3>
                <div class="kb-modal-grid">
                    <div><small>Mulai</small><b data-kbe-modal-start></b></div>
                    <div><small>Selesai</small><b data-kbe-modal-end></b></div>
                    <div><small>Lokasi</small><b data-kbe-modal-location></b></div>
                    <div><small>Kategori</small><b data-kbe-modal-category></b></div>
                </div>
                <p data-kbe-modal-description></p>
            </div>
        </div>
    <?php }

    public static function potensi() {
        self::assets();
        $q=self::q('kb_potensi',['orderby'=>'menu_order title','order'=>'ASC']);
        ob_start(); ?>
        <section class="kb-enhancement kb-potensi" data-kbe-potensi>
            <div class="kb-card-grid">
            <?php if($q->have_posts()): while($q->have_posts()): $q->the_post();
                $id=get_the_ID();
                $img=get_the_post_thumbnail_url($id,'large');
                $cat=get_post_meta($id,'kb_category',true);
                $loc=get_post_meta($id,'kb_location',true);
                $contact=get_post_meta($id,'kb_contact',true);
                $map=get_post_meta($id,'kb_map_url',true);
                $content=wp_kses_post(apply_filters('the_content',get_the_content()));
                ?>
                <button type="button" class="kb-potensi-card"
                    data-kbe-potential
                    data-title="<?php echo esc_attr(get_the_title()); ?>"
                    data-category="<?php echo esc_attr($cat); ?>"
                    data-location="<?php echo esc_attr($loc); ?>"
                    data-contact="<?php echo esc_attr($contact); ?>"
                    data-map="<?php echo esc_attr($map); ?>"
                    data-image="<?php echo esc_attr($img); ?>"
                    data-content="<?php echo esc_attr(wp_strip_all_tags(get_the_content())); ?>">
                    <?php if($img): ?><img src="<?php echo esc_url($img); ?>" alt="<?php echo esc_attr(get_the_title()); ?>"><?php endif; ?>
                    <span><small><?php echo esc_html($cat); ?></small><strong><?php the_title(); ?></strong></span>
                </button>
            <?php endwhile; wp_reset_postdata(); else: ?>
                <p class="kb-empty">Belum ada Potensi Desa. Tambahkan dari Dashboard WordPress → Potensi Desa.</p>
            <?php endif; ?>
            </div>
            <div class="kb-potential-detail" data-kbe-potential-detail hidden></div>
        </section>
        <?php return ob_get_clean();
    }

    public static function regulasi() {
        self::assets();
        $q=self::q('kb_regulasi',['meta_key'=>'kb_year','orderby'=>'meta_value_num','order'=>'DESC']);
        $years=[];
        $rows=[];
        if($q->have_posts()) {
            while($q->have_posts()) { $q->the_post();
                $id=get_the_ID();
                $year=get_post_meta($id,'kb_year',true);
                if($year) $years[$year]=$year;
                $rows[]=[
                    'title'=>get_the_title(),
                    'number'=>get_post_meta($id,'kb_number',true),
                    'year'=>$year,
                    'status'=>get_post_meta($id,'kb_status',true),
                    'type'=>get_post_meta($id,'kb_type',true),
                    'pdf'=>get_post_meta($id,'kb_pdf_url',true),
                ];
            }
            wp_reset_postdata();
        }
        rsort($years);
        ob_start(); ?>
        <section class="kb-enhancement kb-regulasi" data-kbe-regulasi>
            <div class="kb-filterbar">
                <input type="search" data-kbe-reg-search placeholder="Cari nomor atau judul regulasi...">
                <label>Tahun<select data-kbe-reg-year><option value="all">Semua tahun</option><?php foreach($years as $y) echo '<option>'.esc_html($y).'</option>'; ?></select></label>
                <label>Status<select data-kbe-reg-status><option value="all">Semua status</option><option>Berlaku</option><option>Arsip</option><option>Perlu Validasi</option></select></label>
            </div>
            <div class="kb-table-wrap"><table class="kb-table">
                <thead><tr><th>Jenis</th><th>Nomor/Tahun</th><th>Judul</th><th>Status</th><th>Dokumen</th></tr></thead>
                <tbody>
                <?php foreach($rows as $r): ?>
                    <tr data-kbe-reg-row data-year="<?php echo esc_attr($r['year']); ?>" data-status="<?php echo esc_attr($r['status']); ?>" data-search="<?php echo esc_attr(strtolower($r['number'].' '.$r['title'].' '.$r['type'])); ?>">
                        <td><?php echo esc_html($r['type']); ?></td>
                        <td><?php echo esc_html($r['number'].($r['year']?' / '.$r['year']:'')); ?></td>
                        <td><?php echo esc_html($r['title']); ?></td>
                        <td><span class="kb-pill"><?php echo esc_html($r['status']); ?></span></td>
                        <td><?php echo $r['pdf'] ? '<a class="kb-link" href="'.esc_url($r['pdf']).'" target="_blank" rel="noopener">Lihat PDF</a>' : '—'; ?></td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table></div>
        </section>
        <?php return ob_get_clean();
    }

    public static function rtrw() {
        self::assets();
        $q=self::q('kb_rtrw',['orderby'=>'title','order'=>'ASC']);
        ob_start(); ?>
        <section class="kb-enhancement kb-rtrw" data-kbe-rtrw>
            <div class="kb-filterbar">
                <input type="search" data-kbe-rtrw-search placeholder="Cari nama, RT/RW, atau dusun...">
                <label>Dusun<select data-kbe-rtrw-dusun><option value="all">Semua dusun</option><option>Kendalbulur</option><option>Genting</option><option>Rongganan</option></select></label>
                <label>RW<select data-kbe-rtrw-rw><option value="all">Semua RW</option><?php for($i=1;$i<=7;$i++) echo '<option value="'.sprintf('%02d',$i).'">RW '.sprintf('%02d',$i).'</option>'; ?></select></label>
                <label>Jenis<select data-kbe-rtrw-role><option value="all">RT & RW</option><option>RT</option><option>RW</option></select></label>
            </div>
            <div class="kb-directory-grid">
            <?php if($q->have_posts()): while($q->have_posts()): $q->the_post();
                $id=get_the_ID();
                $role=get_post_meta($id,'kb_role',true);
                $dusun=get_post_meta($id,'kb_dusun',true);
                $rw=get_post_meta($id,'kb_rw',true);
                $rt=get_post_meta($id,'kb_rt',true);
                $phone=get_post_meta($id,'kb_phone',true);
                $address=get_post_meta($id,'kb_address',true);
                $img=get_the_post_thumbnail_url($id,'medium');
                ?>
                <article class="kb-person" data-kbe-rtrw-item data-role="<?php echo esc_attr($role); ?>" data-dusun="<?php echo esc_attr($dusun); ?>" data-rw="<?php echo esc_attr($rw); ?>" data-search="<?php echo esc_attr(strtolower(get_the_title().' '.$role.' '.$rt.' '.$rw.' '.$dusun.' '.$address)); ?>">
                    <?php if($img): ?><img src="<?php echo esc_url($img); ?>" alt="<?php echo esc_attr(get_the_title()); ?>"><?php endif; ?>
                    <strong><?php the_title(); ?></strong>
                    <span><?php echo esc_html($role.' '.($role==='RT'?$rt:$rw).($role==='RT' && $rw?' · RW '.$rw:'')); ?></span>
                    <small>Dusun <?php echo esc_html($dusun); ?></small>
                    <?php if($phone): ?><a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/','',$phone)); ?>"><?php echo esc_html($phone); ?></a><?php endif; ?>
                    <?php if($address): ?><p><?php echo esc_html($address); ?></p><?php endif; ?>
                </article>
            <?php endwhile; wp_reset_postdata(); else: ?>
                <p class="kb-empty">Belum ada data RT/RW. Tambahkan dari Dashboard WordPress → Direktori RT/RW.</p>
            <?php endif; ?>
            </div>
        </section>
        <?php return ob_get_clean();
    }

    public static function simpeldesa() {
        self::assets();
        $url=KBE_Settings::get('simpeldesa_url','#');
        $wa=KBE_Settings::get('whatsapp','6282232647069');
        ob_start(); ?>
        <section class="kb-enhancement kb-simpeldesa">
            <div class="kb-simpel-grid">
                <div>
                    <span class="kb-eyebrow">Layanan Digital Desa</span>
                    <h2>Ajukan surat dari HP, tanpa antre lama di kantor desa</h2>
                    <p>Warga dapat mengakses layanan surat dari rumah melalui platform resmi Simpeldesa. Website desa hanya menjadi pintu informasi dan tautan menuju layanan resmi.</p>
                    <ul class="kb-benefits">
                        <li>Pengajuan dapat dilakukan dari rumah.</li>
                        <li>Notifikasi layanan dapat diterima melalui HP.</li>
                        <li>Warga tetap dapat memilih pelayanan manual di kantor desa.</li>
                    </ul>
                    <div class="kb-actions">
                        <a class="kb-btn" href="<?php echo esc_url($url); ?>" target="_blank" rel="noopener">Buka Simpeldesa</a>
                        <a class="kb-btn kb-btn-outline" href="https://wa.me/<?php echo esc_attr($wa); ?>" target="_blank" rel="noopener">Hubungi WhatsApp</a>
                    </div>
                </div>
                <aside class="kb-note"><b>Catatan implementasi prototype</b><p>Tidak membuat login/SSO sendiri, tidak menyinkronkan database WordPress, dan tidak memakai API tanpa akses resmi penyedia.</p></aside>
            </div>
        </section>
        <?php return ob_get_clean();
    }

    public static function data_warga($atts) {
        self::assets();
        $a=shortcode_atts(['penduduk'=>'4190','kk'=>'1477','dusun'=>'3','rt'=>'22','rw'=>'7'],$atts);
        ob_start(); ?>
        <section class="kb-enhancement kb-stats" data-kbe-stats>
            <div><strong data-kbe-count="<?php echo esc_attr((int)$a['penduduk']); ?>"><?php echo esc_html(number_format_i18n((int)$a['penduduk'])); ?></strong><span>Jumlah Penduduk</span></div>
            <div><strong data-kbe-count="<?php echo esc_attr((int)$a['kk']); ?>"><?php echo esc_html(number_format_i18n((int)$a['kk'])); ?></strong><span>Jumlah KK</span></div>
            <div><strong data-kbe-count="<?php echo esc_attr((int)$a['dusun']); ?>" data-pad="2"><?php echo esc_html(str_pad((int)$a['dusun'],2,'0',STR_PAD_LEFT)); ?></strong><span>Dusun</span></div>
            <div><strong><?php echo esc_html(str_pad((int)$a['rt'],2,'0',STR_PAD_LEFT).'/'.str_pad((int)$a['rw'],2,'0',STR_PAD_LEFT)); ?></strong><span>RT/RW</span></div>
        </section>
        <?php return ob_get_clean();
    }

    public static function idm($atts) {
        self::assets();
        $a=shortcode_atts(['ekonomi'=>'0.5000','lingkungan'=>'0.7333','nilai'=>'0.6435','kategori'=>'BERKEMBANG'],$atts);
        $items=[
            ['Indeks Ekonomi',$a['ekonomi']],
            ['Indeks Lingkungan',$a['lingkungan']],
            ['Nilai IDM',$a['nilai']],
        ];
        ob_start(); ?>
        <section class="kb-enhancement kb-idm" data-kbe-idm>
            <?php foreach($items as $item):
                $v=max(0,min(1,(float)$item[1])); ?>
                <div class="kb-idm-row"><span><?php echo esc_html($item[0]); ?></span><div class="kb-progress"><div data-kbe-progress style="--target:<?php echo esc_attr($v*100); ?>%"><b><?php echo esc_html(number_format($v,4,'.','')); ?></b></div></div></div>
            <?php endforeach; ?>
            <div class="kb-idm-category"><span>Kategori Desa</span><b><?php echo esc_html($a['kategori']); ?></b></div>
        </section>
        <?php return ob_get_clean();
    }
}
