const app = Vue.createApp({
    data() {
        return {
            message: 'Please upload a file',
            images: []
        }
    },
    methods: {
        upload(e) {
            const form = e.currentTarget;
            console.log({ form });

            // get the file input
            // check its files. 
            // if no files, set error message!
            const fileInput = form.querySelector('input[type=file]');
            console.log(fileInput.files);

            if (fileInput.files.length < 1) {
                this.message = 'You must first select a file!';
                return;
            }

            const myFormData = new FormData(form);

            fetch(form.action, {
                method: 'post',
                body: myFormData
            }).then(res => res.json())
                .then((data) => {
                    if (data.message) {
                        this.message = data.message;
                    }
                    this.images.push(data.path);
                })
        }
    }
});
app.mount('#main');
