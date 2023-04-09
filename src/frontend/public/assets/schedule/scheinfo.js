const formNotFullFilled = '항목이 모두 입력되지 않았습니다.';
const timeError = '시간을 잘못 입력하셨습니다.';

Vue.createApp({
    data() {
        return {
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            schedules: [],
            dow: '',
            userId: '',
            userName: '',
            availDesc: formNotFullFilled,
            editScheduleId: null,
            editTitle: '',
            editDesc: '',
            editScheduleDeleted: false,
            modal: null,
        }
    },
    async mounted () {
        this.loadUserInfo();
        this.loadSchedules();
    }, 
    methods: {
        navbarHighlight(value) {
            return (location.pathname == value) ? 'fw-bold' : false;
        },
        editSchedule(i) {
            this.editScheduleId = this.schedules[i].id;
            this.editDesc = this.schedules[i].description;
            this.editTitle = this.schedules[i].title;
            this.editScheduleDeleted = false;
            (new bootstrap.Modal(document.getElementById('editStartModal'), {backdrop: true})).show();
        },
        async editScheduleCall() {
            if (this.editScheduleDeleted)
            {   
                await fetch(
                    `/v/schedules/${this.editScheduleId}`, 
                    { method: 'DELETE' }
                );
            }
            else
            {
                const body = {
                    title: this.editTitle,
                    description: this.editDesc
                };
    
                await fetch(
                    `/v/schedules/${this.editScheduleId}`, 
                    { 
                        method: 'PUT',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify(body),
                    },
                );
            }
            location.reload();   
        },
        logout( ) {
            fetch(`/v/auth/logout`, {
                method: "GET"
            }).then((res) => {
                if(res.status == 200)
                    location.href='/login';
            });
        },
        async loadUserInfo() {
            const res = await fetch(`/v/auth/current`, {
                method: "GET"
            });
            
            if (res.status != 200)
                location.href='/login';
            
            const jsonBody = await res.json();
            this.userId = jsonBody.userId;
            this.userName = jsonBody.userName;
        },
        async loadSchedules() {
            const res = await fetch(`/v/schedules/created`, {
                method: "GET"
            });
            if (res.status != 200)
                return;
            this.schedules = await res.json();
        },
        convertDateToString(schedule) {
            function convertDate (date) { 
                date = new Date(date);
                return date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' , hour: '2-digit', minute: '2-digit'})
            };
            function convertDay (date) { 
                date = new Date(date);
                return date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' , weekday: 'short' })
            };
            return `${convertDate(schedule.startDate)} - ${convertDate(schedule.endDate)}, ${convertDay(schedule.endDate)}`;
        },
        isChanged () {
            if (this.title == '') {
                this.availDesc = formNotFullFilled;
                return null;
            }

            if (this.description == '') {
                this.availDesc = formNotFullFilled;
                return null;
            }

            if (this.startDate == '') {
                this.availDesc = formNotFullFilled;
                return null;
            }

            if (this.endDate == '') {
                this.availDesc = formNotFullFilled;
                return null;
            }

            if (this.dow == '') {
                this.availDesc = formNotFullFilled;
                return null;
            }


            const dow = Number(this.dow);
            const days = 25 + dow;

            const body = {
                title: this.title,
                description: this.description,
                startDate: `1999-10-${days} ${this.startDate}:00+09:00`,
                endDate: `1999-10-${days} ${this.endDate}:00+09:00`,
            }

            if (new Date(body.startDate) >= new Date(body.endDate)) {
                this.availDesc = timeError
                return null;
            }

            this.availDesc = '';
            return body;
        },
        async addSchedule() {
            const body = this.isChanged();
            const res = await fetch(
                `/v/schedules/`, 
                { 
                    method: 'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(body),
                },
            );

            location.reload();
        }
    }
}).mount('#myApp');