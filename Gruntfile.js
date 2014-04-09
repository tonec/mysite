
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
			assets: 'assets',
			cssIndex: [
				'<%= project.assets %>/less/index.less'
			],
			js: [
				'<%= project.assets %>/js/*.js'
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
		less: {
			dev: {
				options: {
					paths: ['<%= project.assets %>/css']
				},
				files: {
					'<%= project.assets %>/css/index.css': '<%= project.cssIndex %>'
				}
			},
			dist: {
				option: {
					paths: ['<%= project.assets %>/css']
				},
				files: {
					'<%= project.assets %>/css/index.css': '<%= project.cssIndex %>'
				}
			}
		},
		watch: {
			less: {
				files: '<%= project.assets %>/less/{,*/}*.less',
				tasks: ['less:dev'],
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
		'less:dev',
		'watch'
	]);
};
	