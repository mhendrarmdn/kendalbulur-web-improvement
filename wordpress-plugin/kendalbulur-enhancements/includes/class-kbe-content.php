<?php
if (!defined('ABSPATH')) exit;

class KBE_Content {
    private static $meta = [
        'kb_agenda' => [
            'kb_start'    => ['label'=>'Tanggal & jam mulai','type'=>'datetime-local'],
            'kb_end'      => ['label'=>'Tanggal & jam selesai','type'=>'datetime-local'],
            'kb_location' => ['label'=>'Lokasi','type'=>'text'],
            'kb_category' => ['label'=>'Kategori','type'=>'text'],
        ],
        'kb_potensi' => [
            'kb_category' => ['label'=>'Kategori','type'=>'text'],
            'kb_location' => ['label'=>'Lokasi','type'=>'text'],
            'kb_contact'  => ['label'=>'Kontak','type'=>'text'],
            'kb_map_url'  => ['label'=>'URL Google Maps','type'=>'url'],
        ],
        'kb_regulasi' => [
            'kb_number'  => ['label'=>'Nomor','type'=>'text'],
            'kb_year'    => ['label'=>'Tahun','type'=>'number'],
            'kb_status'  => ['label'=>'Status','type'=>'select','options'=>['Berlaku','Arsip','Perlu Validasi']],
            'kb_type'    => ['label'=>'Jenis','type'=>'select','options'=>['Perdes','Perkades','SK','Lainnya']],
            'kb_pdf_url' => ['label'=>'URL PDF','type'=>'url'],
        ],
        'kb_rtrw' => [
            'kb_role'    => ['label'=>'Jenis','type'=>'select','options'=>['RW','RT']],
            'kb_dusun'   => ['label'=>'Dusun','type'=>'select','options'=>['Kendalbulur','Genting','Rongganan']],
            'kb_rw'      => ['label'=>'Nomor RW','type'=>'text'],
            'kb_rt'      => ['label'=>'Nomor RT','type'=>'text'],
            'kb_phone'   => ['label'=>'Kontak','type'=>'text'],
            'kb_address' => ['label'=>'Alamat','type'=>'text'],
        ],
    ];

    public static function init() {
        add_action('init',[__CLASS__,'register_post_types']);
        add_action('add_meta_boxes',[__CLASS__,'add_meta_boxes']);
        add_action('save_post',[__CLASS__,'save_meta']);
    }

    public static function register_post_types() {
        $types = [
            'kb_agenda' => ['Agenda','Agenda','dashicons-calendar-alt'],
            'kb_potensi' => ['Potensi Desa','Potensi Desa','dashicons-location-alt'],
            'kb_regulasi' => ['Regulasi','Regulasi','dashicons-media-document'],
            'kb_rtrw' => ['Direktori RT/RW','RT/RW','dashicons-groups'],
        ];

        foreach ($types as $slug=>$cfg) {
            register_post_type($slug,[
                'labels'=>[
                    'name'=>$cfg[0],
                    'singular_name'=>$cfg[1],
                    'add_new_item'=>'Tambah '.$cfg[1],
                    'edit_item'=>'Edit '.$cfg[1],
                    'menu_name'=>$cfg[0],
                ],
                'public'=>true,
                'show_in_rest'=>true,
                'menu_icon'=>$cfg[2],
                'supports'=>['title','editor','thumbnail'],
                'has_archive'=>false,
                'rewrite'=>false,
                'show_in_nav_menus'=>false,
            ]);
        }
    }

    public static function add_meta_boxes() {
        foreach (self::$meta as $type=>$fields) {
            add_meta_box(
                'kbe_meta_'.$type,
                'Data Kendalbulur',
                function($post) use ($type,$fields) {
                    wp_nonce_field('kbe_save_'.$type,'kbe_nonce_'.$type);
                    echo '<table class="form-table"><tbody>';
                    foreach ($fields as $key=>$cfg) {
                        $value = get_post_meta($post->ID,$key,true);
                        echo '<tr><th><label for="'.esc_attr($key).'">'.esc_html($cfg['label']).'</label></th><td>';
                        if ($cfg['type']==='select') {
                            echo '<select name="'.esc_attr($key).'" id="'.esc_attr($key).'" class="regular-text">';
                            foreach ($cfg['options'] as $opt) {
                                echo '<option value="'.esc_attr($opt).'" '.selected($value,$opt,false).'>'.esc_html($opt).'</option>';
                            }
                            echo '</select>';
                        } else {
                            echo '<input class="regular-text" type="'.esc_attr($cfg['type']).'" name="'.esc_attr($key).'" id="'.esc_attr($key).'" value="'.esc_attr($value).'">';
                        }
                        echo '</td></tr>';
                    }
                    echo '</tbody></table>';
                },
                $type,
                'normal',
                'high'
            );
        }
    }

    public static function save_meta($post_id) {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
        $type = get_post_type($post_id);
        if (!isset(self::$meta[$type])) return;
        if (!current_user_can('edit_post',$post_id)) return;
        $nonce_key='kbe_nonce_'.$type;
        if (!isset($_POST[$nonce_key]) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST[$nonce_key])),'kbe_save_'.$type)) return;

        foreach (self::$meta[$type] as $key=>$cfg) {
            if (!isset($_POST[$key])) {
                delete_post_meta($post_id,$key);
                continue;
            }
            $raw = wp_unslash($_POST[$key]);
            $value = $cfg['type']==='url' ? esc_url_raw($raw) : sanitize_text_field($raw);
            update_post_meta($post_id,$key,$value);
        }
    }
}
