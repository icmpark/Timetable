Vue.createApp({
    data() {
        return {
            password: '',
            userId: '',
            modal: null,
        }
    },
    mounted () {
        this.modal = new bootstrap.Modal(document.getElementById('loginFailedModal'), {backdrop: true});
    }, 
    methods: {
        register( ) {
            fetch(`/v/auth/login`, {
                method: "POST",
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({
                    userId: this.userId,
                    password: this.password,
                }),
            }).then((res) => {
                if(res.status != 200)
                    this.modal.show();
                else
                    location.href='/';
            });

        }
    }
}).mount('#registerApp');