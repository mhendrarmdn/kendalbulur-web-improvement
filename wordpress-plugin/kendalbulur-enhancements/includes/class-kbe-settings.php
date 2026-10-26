<?php
if (!defined('ABSPATH')) exit;

class KBE_Settings {
    const OPTION='kbe_options';

    public static function init() {
        add_action('admin_menu',[__CLASS__,'menu']);
        add_action('admin_init',[__CLASS__,'register']);
    }

    public static function menu() {
        add_options_page(
            'Kendalbulur Enhancements',
            'Kendalbulur Enhancements',
            'manage_options',
            'kendalbulur-enhancements',
            [__CLASS__,'page']
        );
    }

    public static function register() {
        register_setting('kbe_settings',self::OPTION,[
            'sanitize_callback'=>function($input){
                return [
                    'simpeldesa_url'=>isset($input['simpeldesa_url']) ? esc_url_raw($input['simpeldesa_url']) : '',
                    'whatsapp'=>isset($input['whatsapp']) ? preg_replace('/[^0-9]/','',$input['whatsapp']) : '',
                ];
            }
        ]);
    }

    public static function get($key,$default='') {
        $opts=get_option(self::OPTION,[]);
        return isset($opts[$key]) && $opts[$key]!=='' ? $opts[$key] : $default;
    }

    public static function page() {
        if (!current_user_can('manage_options')) return;
        $opts=get_option(self::OPTION,[]);
        ?>
        <div class="wrap">
            <h1>Kendalbulur Website Enhancements</h1>
            <p>Plugin ini menambahkan fitur modular tanpa mengganti theme, header, footer, atau CSS global website.</p>
            <form method="post" action="options.php">
                <?php settings_fields('kbe_settings'); ?>
                <table class="form-table">
                    <tr>
                        <th><label for="kbe_simpeldesa_url">URL Simpeldesa</label></th>
                        <td><input class="regular-text" id="kbe_simpeldesa_url" name="<?php echo esc_attr(self::OPTION); ?>[simpeldesa_url]" type="url" value="<?php echo esc_attr($opts['simpeldesa_url'] ?? ''); ?>" placeholder="https://..."></td>
                    </tr>
                    <tr>
                        <th><label for="kbe_whatsapp">WhatsApp Desa</label></th>
                        <td><input class="regular-text" id="kbe_whatsapp" name="<?php echo esc_attr(self::OPTION); ?>[whatsapp]" type="text" value="<?php echo esc_attr($opts['whatsapp'] ?? '6282232647069'); ?>" placeholder="628..."></td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>

            <hr>
            <h2>Shortcode</h2>
            <table class="widefat striped" style="max-width:900px">
                <thead><tr><th>Fitur</th><th>Shortcode</th><th>Penempatan</th></tr></thead>
                <tbody>
                    <tr><td>Agenda</td><td><code>[kb_agenda]</code></td><td>Widget Shortcode Elementor pada halaman Agenda</td></tr>
                    <tr><td>Potensi Desa</td><td><code>[kb_potensi]</code></td><td>Halaman Potensi Desa</td></tr>
                    <tr><td>Regulasi</td><td><code>[kb_regulasi]</code></td><td>Halaman Perdes/Regulasi</td></tr>
                    <tr><td>RT/RW</td><td><code>[kb_rtrw]</code></td><td>Halaman direktori RT/RW</td></tr>
                    <tr><td>Simpeldesa</td><td><code>[kb_simpeldesa]</code></td><td>Halaman layanan Simpeldesa</td></tr>
                    <tr><td>Data Warga</td><td><code>[kb_data_warga penduduk="4190" kk="1477" dusun="3" rt="22" rw="7"]</code></td><td>Beranda</td></tr>
                    <tr><td>IDM</td><td><code>[kb_idm ekonomi="0.5000" lingkungan="0.7333" nilai="0.6435" kategori="BERKEMBANG"]</code></td><td>Halaman IDM</td></tr>
                </tbody>
            </table>
        </div>
        <?php
    }
}
