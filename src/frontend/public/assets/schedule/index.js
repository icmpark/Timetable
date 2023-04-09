Vue.createApp({
    data() {
        return {
            userId: null,
            userName: null
        }
    },
    async mounted () {
        const result = await fetch(
            `/v/auth/current`, 
            {
                method: "GET"
            }
        )

        if(result.status != 200)
            location.href='/login';
        
        const jsonResult = await result.json();
        
        this.userName = jsonResult.userName;
        this.userId = jsonResult.userId;
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