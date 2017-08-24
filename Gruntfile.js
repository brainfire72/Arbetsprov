module.exports = function (grunt) {

    var properties = {
        paths: {
            src: 'clientlibs',
            dest: 'dist/webroot'
        }
    };

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //Concat
        concat: {
            js: {
                src: [
                    properties.paths.src + '/core/js/*.js',
                    properties.paths.src + '/core/components/*/*.module.js',
                    properties.paths.src + '/core/components/*/*.component.js'
                ],
                dest: properties.paths.dest + '/components/js/components.js'
            }
        },


        //Compile sass files to css
        sass: {
            dest: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dist/webroot/common/main.css' : properties.paths.src + '/core/sass/main-importer.sass'
                }
            }
        },

        sync: {
            syncomponents: {
                files: [{
                    cwd: properties.paths.src + '/core/components',
                    src: '**/*.html',
                    dest: properties.paths.dest + '/components',
                    expand: true
                }]
            },
            syncresources: {
                files: [{
                    cwd: properties.paths.src + '/core/resources',
                    src: '**/*',
                    dest: properties.paths.dest + '/resources',
                    expand: true
                }]
            }
        }


        //clean: {
        //    all: {
        //        src: [properties.paths.dest]
        //    }
        //}



    });


    // Load all required grunt plugins
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('storefront_setup_build', ['concat', 'sass', 'sync']);

    // Default task(s).
    grunt.registerTask('default', ['storefront_setup_build']);
};