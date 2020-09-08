module.exports = function(grunt) {
  grunt.initConfig({
    aws: grunt.file.readJSON(process.env.HOME + '/.aws/grunt-aws.json'),
    s3: {
      options: {
        accessKeyId: '<%= aws.accessKeyId %>',
        secretAccessKey: '<%= aws.secretAccessKey %>',
        bucket: '<%= aws.bucket %>'
      },
      png: {
        expand: true,
        cwd: './client/',
        src: ['**/*.png'],
        dest: 'sdc-booking-proxy',
        ext: '.png'
      },
      jpg: {
        expand: true,
        cwd: './client/',
        src: ['**/*.jpg'],
        dest: 'sdc-booking-proxy',
        ext: '.jpg'
      },
      style: {
        src: './client/style.css',
        dest: 'sdc-booking-proxy/style.css'
      },
      fonts: {
        expand: true,
        cwd: './client/',
        src: ['**/*.woff'],
        dest: 'sdc-booking-proxy',
        ext: '.woff'
      }
    }
  });

  grunt.loadNpmTasks('grunt-aws');
  grunt.registerTask('default', ['s3']);
};
