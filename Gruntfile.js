module.exports = function(grunt){
    grunt.loadNpmTasks("grunt-concurrent");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-express-server");

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint:{
            options:{
                jshintrc:".jshintrc"
            }
        },
        express:{
            dev:{
                options:{
                    script: __dirname+"/server.js"
                }
            }
        },
        concurrent:{
            dev:["express","watch"]
        },
        watch:{
            scripts:{
                files:["js/**/*.js"],
                tasks:["jshint"],
                options:{
                    livereload:true
                }
            }
        }
    })


    grunt.registerTask("default",["concurrent"]);
    grunt.registerTask("test",["jshint"]);
};