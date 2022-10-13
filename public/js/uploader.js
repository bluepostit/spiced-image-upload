const app = Vue.createApp({
    data() {
        return {
            message: 'Please upload a file',
            images: []
        }
    },
    methods: {
        upload(e) {
            console.log('about to upload');
            const form = e.currentTarget;

            const fileInput = form.querySelector(
                'input[type=file]');
            console.log(fileInput.files);
            if (fileInput.files.length === 0) {
                alert('No files selected!');
                return;
            }
            
            const formData = new FormData(form);
            fetch(form.action, {
                method: form.method,
                body: formData
            }).then(res => res.json())
              .then((data) => {
                console.log(data);
                this.message = data.message;
                if (data.path) {
                    this.images.push(data.path);
                }
              })
        }
    }
});

app.mount('main');