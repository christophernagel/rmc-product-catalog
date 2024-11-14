<?php
/**
 * Plugin Name: RMC Product Catalog
 * Description: React-based product catalog block for Rep Materials Company
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

function rmc_catalog_init() {
    // Register block script
    wp_register_script(
        'rmc-catalog-block',
        plugins_url('build/index.js', __FILE__),
        ['wp-blocks', 'wp-element', 'wp-block-editor']
    );

    // Register and enqueue frontend script
    wp_register_script(
        'rmc-catalog-frontend',
        plugins_url('build/frontend.js', __FILE__),
        ['wp-element'],
        filemtime(plugin_dir_path(__FILE__) . 'build/frontend.js')
    );

    // Register styles
    wp_register_style(
        'rmc-catalog-style',
        plugins_url('src/css/style.css', __FILE__),
        [],
        filemtime(plugin_dir_path(__FILE__) . 'src/css/style.css')
    );

    // Register block
    register_block_type('rmc-catalog/product-catalog', [
        'editor_script' => 'rmc-catalog-block',
        'style' => 'rmc-catalog-style',
        'render_callback' => 'rmc_catalog_render_callback'
    ]);
}

function rmc_catalog_render_callback($attributes) {
    // Enqueue frontend assets
    wp_enqueue_script('rmc-catalog-frontend');
    wp_enqueue_style('rmc-catalog-style');
    
    // Return container for React to mount to
    return '<div id="rmc-product-catalog"></div>';
}

add_action('init', 'rmc_catalog_init');