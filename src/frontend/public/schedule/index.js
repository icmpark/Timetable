
const colormap = [
    '#b3e2cd',
    '#fdcdac',
    '#cbd5e8',
    '#f4cae4',
    '#e6f5c9',
    '#fff2ae',
    '#f1e2cc',
    '#cccccc',
]



Vue.createApp({
    data() {
        return {
            userId: null,
            userName: null,
            scheduleSearch: '',
            showSchedules: [],
            schedules: [],
            tdTarget: null,
            assignSchedules: null,
            cacheSchedules: [],
            modal: null,
        }
    },
    async mounted () {
        this.loadUserInfo();
        this.loadSchedules();
        this.loadAssignSchedules();
        this.modal = new bootstrap.Modal(document.getElementById('addScheduleFailedModal'), {backdrop: true});
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        })

        this.tdTarget = document.getElementsByClassName('tableCell');
    }, 
    beforeDestroy() { 
        window.removeEventListener('resize', this.onResize); 
    },
    methods: {
        async loadUserInfo() {
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
        navbarHighlight(value) {
            return (location.pathname == value) ? 'fw-bold' : false;
        },
        async loadSchedules() {
            const res = await fetch(`/v/schedules`, {
                method: "GET"
            });
            if (res.status != 200)
                return;
            this.schedules = this.showSchedules = await res.json();
        },
        async addSchedule(index) {
            const scheduleId = this.showSchedules[index].id;
            const res = await fetch(`/v/schedules/${scheduleId}/users/${this.userId}`, {
                method: "POST"
            });

            if (res.status == 201) {     
                this.cacheSchedules.push(this.getScheduleInfo(this.showSchedules[index]));
                this.assignSchedules.push(this.showSchedules[index]);
            }
            else {
                this.modal.show();
            }
        },
        async delSchedule(index) {
            const scheduleId = this.assignSchedules[index].id;
            const res = await fetch(`/v/schedules/${scheduleId}/users/${this.userId}`, {
                method: "DELETE"
            });
            this.cacheSchedules = this.cacheSchedules.filter((schedule) => schedule[0] != scheduleId);
            this.assignSchedules = this.assignSchedules.filter((schedule) => schedule.id != scheduleId);
        },
        async loadAssignSchedules() {
            const res = await fetch(`/v/schedules/assigned`, {
                method: "GET"
            });
            if (res.status != 200)
                return;
            this.assignSchedules = await res.json();
            this.cacheSchedules = this.assignSchedules.map((schedule) => this.getScheduleInfo(schedule));
        },
        getHoverStyles(schedule, i) {
            const [scheId, startDate, endDate, dow] = this.cacheSchedules[i];
            const rect = this.tdTarget[dow].getBoundingClientRect();
            const height = rect.height * ((endDate - startDate) / 60);
            const left = rect.x + window.scrollX ;
            const top = rect.y + window.scrollY + rect.height * (startDate / 60);
            
            return {
                'left': left + 'px',
                'top': top + 'px',
                'width': rect.width + 'px',
                'height': height + 'px',
                'z-index': (schedule.id != this.assignSchedules[this.assignSchedules.length-1].id) ? 5 : 6,
                'background-color': colormap[i % colormap.length]
            };
        },
        scheduleMouseOver(index) {
            this.cacheSchedules.push(this.getScheduleInfo(this.showSchedules[index]));
            this.assignSchedules.push(this.showSchedules[index]);
        },
        scheduleMouseLeave(index) {
            this.cacheSchedules.pop();
            this.assignSchedules.pop();
        },
        getTableValue(row, col) {
            if (row == 1)
                return ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][col-1]

            if (col == 1)
            {
                if (row < 6)
                    return `AM ${String(row + 6).padStart(2, '0')}`;
                else
                    return `PM ${String((row == 6) ? (row + 6) : (row - 6)).padStart(2, '0')}`;
            }
                
            return '';
        },
        getScheduleInfo(schedule) {
            function convertDate (date) { 
                date = new Date(date);
                date = date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' , hour: '2-digit', minute: '2-digit', hour12: false});
                return Number(date.substr(0, 2) - 7) * 60 + Number(date.substr(3, 2));
            };
            function convertDay (date) { 
                date = new Date(date);
                const dow = date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' , weekday: 'short' });

                return {
                    'Mon': 1,
                    'Tue': 2,
                    'Wed': 3,
                    'Thu': 4,
                    'Fri': 5,
                    'Sat': 6,
                    'Sun': 7,
                }[dow];
            };

            return [schedule.id, convertDate(schedule.startDate), convertDate(schedule.endDate), convertDay(schedule.endDate)];
        },
        async searchChange() {
            this.showSchedules = this.schedules.filter((value) => value.title.startsWith(this.scheduleSearch));
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
        logout( ) {
            fetch(`/v/auth/logout`, {
                method: "GET"
            }).then((res) => {
                if(res.status == 200)
                    location.href='/login';
            });

        },
        onResize() {
            const schedules = this.assignSchedules;
            this.assignSchedules = [];
            this.assignSchedules = schedules;
        }
    }
}).mount('#myApp');