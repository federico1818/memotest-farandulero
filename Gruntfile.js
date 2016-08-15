module.exports = function(grunt) {
	
	grunt.initConfig({
		
		concat: {
			css: {
			  src: ['assets/dev/css/**.css'],
			  dest: 'assets/prod/css/styles.css',
			},

			js: {
			  src: ['assets/dev/js/**.js'],
			  dest: 'assets/prod/js/scripts.js',
			},
			angular: {
			  src: [
			  	'app/app.module.js',
			  	'app/app.routes.js',
			  	'app/shared/core/**.js',
			  	'app/shared/services/**.js',
			  	'app/components/**/**.js',
			  	'app/pages/**/**.js',
			  ],
			  dest: 'assets/prod/js/app.js',
			},
		},

		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: 'assets/prod/css',
		      src: ['styles.css'],
		      dest: 'public/css',
		      ext: '.min.css',
		    }]
		  }
		},

		uglify: {
		    angular: {
		     	src: ['assets/prod/js/app.js'],
		     	dest: 'public/js/app.min.js',
		    },
		},

		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: [{
			        expand: true,
			        cwd: 'app',
			        src: '**/**/*.html',
			        dest: 'public/views/'
			    }]
		   }
		}

	});	

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	grunt.registerTask('css', ['concat:css', 'cssmin']);
	grunt.registerTask('js', ['concat:js', 'uglify:js']);
	grunt.registerTask('angular', ['concat:angular', 'uglify:angular']);
	grunt.registerTask('html', ['htmlmin']);
	
	grunt.registerTask('default', ['css', 'js', 'angular', 'html']);
}
