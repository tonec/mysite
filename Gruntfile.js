
// The Whole World Window Gruntfile
// http://www.thewholeworldwindow.com
// @author Tony Coop
 
'use strict';
 
// Grunt Module
module.exports = function( grunt ) {
 
	// Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),
		project: {
			src: 'src',
			cssStyle: [
				'<%= project.src %>/scss/styles.scss'
			],
			cssOldie: [
				'<%= project.src %>/scss/oldie.scss'
			],
			cssPrint: [
				'<%= project.src %>/scss/print.scss'
			],
			js: [
				'<%= project.src %>/js/*.js'
			]
		},
		tag: {
			banner: '/*!\n' +
				' * <%= pkg.name %>\n' +
				' * <%= pkg.title %>\n' +
				' * <%= pkg.url %>\n' +
				' * @author <%= pkg.author %>\n' +
				' * @version <%= pkg.version %>\n' +
				' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
				' */\n'
		},
		sass: {
			dev: {
				options: {
					style: 'expanded',
					debugInfo: true,
					lineNumbers: true,
					banner: '<%= tag.banner %>',
					compass: true
				},
				files: {
					'css/style.css': '<%= project.cssStyle %>',
					'css/oldie.css': '<%= project.cssOldie %>',
					'css/print.css': '<%= project.cssPrint %>'
				}
			},
			dist: {
				option: {
					style: 'compressed',
					compass: true
				},
				files: {
					'css/style.css': '<%= project.css %>'
				}
			}
		},
		watch: {
			sass: {
				files: '<%= project.src %>/scss/{,*/}*.{scss,sass}',
				tasks: ['sass:dev'],
				options: {
					livereload: true
				}
			}
		}
	});
 
	// Load  Grunt plugins
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
	// Default task
	// Run Grunt on cmd line
	grunt.registerTask('default', [
		'sass:dev',
		'watch'
	]);
};
	