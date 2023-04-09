Vue.createApp({
    data() {
        return {
        }
    },
    mounted () {
    }, 
    methods: {
        navbarHighlight(value) {
            return (location.pathname == value) ? 'fw-bold' : false;
        },
        logout( ) {
            fetch(`/v/auth/logout`, {
                method: "GET"
            }).then((res) => {
                if(res.status == 200)
                    location.href='/login';
            });

        }
    }
}).mount('#myApp');