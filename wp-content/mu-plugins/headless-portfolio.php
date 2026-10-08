<?php
/**
 * Plugin Name: Headless Portfolio
 * Description: Portfolio content exposed through the WordPress REST API.
 * Version: 1.0.0
 */

defined( 'ABSPATH' ) || exit;

add_action( 'init', 'johnzhu_register_portfolio_content' );

/**
 * Keep the content model independent of the active presentation theme.
 */
function johnzhu_register_portfolio_content() {
	register_post_type(
		'portfolio_project',
		array(
			'labels' => array(
				'name'          => 'Projects',
				'singular_name' => 'Project',
				'add_new_item'  => 'Add New Project',
				'edit_item'     => 'Edit Project',
			),
			'public'             => true,
			'publicly_queryable' => false,
			'show_ui'            => true,
			'show_in_rest'       => true,
			'rest_base'          => 'projects',
			'rewrite'            => false,
			'query_var'          => false,
			'menu_icon'          => 'dashicons-portfolio',
			'supports'           => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ),
		)
	);
}

add_action(
	'after_setup_theme',
	function () {
		// Featured images must remain available even with a minimal backend theme.
		if ( ! current_theme_supports( 'post-thumbnails' ) ) {
			add_theme_support( 'post-thumbnails', array( 'portfolio_project' ) );
		} else {
			$support = get_theme_support( 'post-thumbnails' );
			if ( is_array( $support ) && isset( $support[0] ) && is_array( $support[0] ) ) {
				add_theme_support( 'post-thumbnails', array_unique( array_merge( $support[0], array( 'portfolio_project' ) ) ) );
			}
		}
	},
	100
);
