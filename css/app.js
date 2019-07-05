new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameisRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameisRunning = true;
            this.turns = []
        },
        attack: function () {
            let damaged = this.calculateDamaged(3, 10)
            this.monsterHealth -= damaged
            
            this.turns.unshift({
                isPlayer: true,
                text: 'player hits monster for' + damaged
            })

            if (this.checkWin()) {
                return;
            }
            this.monsterAttack()
            
        },
        monsterAttack: function(){
            let damaged = this.calculateDamaged(5, 12)
            this.playerHealth -= damaged
            this.turns.unshift({
                isPlayer: false,
                text: 'monster hits player for' + damaged
            })
            this.checkWin();
        },
        specialAttack: function () {
            let damaged = this.calculateDamaged(10, 20)
            this.monsterHealth -= damaged

            this.turns.unshift({
                isPlayer: true,
                text: 'player hits monster hard for' + damaged
            })
            if (this.checkWin()) {
                return;
            }

            this.monsterAttack()

        },
        heal: function () {
            if (this.playerHealth <= 90) {
            this.playerHealth += 10                
            } else {
                this,playerHealth = 100
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'player hits monster hard for 10'
            })
            this.monsterAttack()

        },
        giveUp: function () {

            this.gameisRunning = false
            this.playerHealth = 100
            this.monsterHealth = 100

        },
        calculateDamaged: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('you want new game ?')) {
                    this.startGame()
                } else {
                    this.gameisRunning = false
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('you lost ! want new game ?')) {
                    this.startGame()
                } else {
                    this.gameisRunning = false
                }
                return true;
            }
            return false;
        }
    }
})