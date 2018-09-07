var mixin = {
    data: () => {
        return {
            searchFormbut: false, // 全局高级搜素
            // input 前面label的宽度
            xeLabelWidth: '90px',
            xeLabelWidth80: '80px'
        };
    },
    created() {
        this.$xeBus.$on('on-advancedSearch-hide', flag => {
            this.searchFormbut = flag;
        });
    },
    watch: {
        searchFormbut(n) {
            if (n === true) {
                this.$nextTick(() => {
                    $('.advancedSearch').show().css({top: $('.u-top-search').height()}).animate({right: 0, opacity: 1}, 100);
                });
            } else {
                this.$nextTick(() => {
                    $('.advancedSearch').animate({right: '-10%', opacity: 0}, 100, () => {
                        $('.advancedSearch').hide();
                    });
                });
            }
        }
    }
};

export default mixin;
