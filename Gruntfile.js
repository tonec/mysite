
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
		jshint: {
			all: ['Gruntfile.js', 'js/*.js']
		},
		watch: {
			html: {
				files: 'index.html',
				options: {
					livereload: true
				}
			},
			less: {
				files: '<%= project.assets %>/less/{,*/}*.less',
				tasks: ['less:dev'],
				options: {
					livereload: true
				}
			},
			js: {
				files: '<%= project.assets %>/js/*.js',
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			}
		},
		'ftp-deploy': {
			build: {
				auth: {
					host: 'ftp.thewholeworldwindow.co.uk',
					port: 21,
					authKey: 'key1'
				},
				src: 'assets',
				dest: '/public_html/assets',
				exclusions: ['**/.DS_Store', '**/Thumbs.db', 'tmp']
			}
		}
	});
 
	// Load  Grunt plugins
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
	// Default task
	grunt.registerTask('default', [
		'less:dev',
		'watch'
	]);

	// Deploy task
	grunt.registerTask('deploy', [
		'ftp-deploy'
	]);
};
	