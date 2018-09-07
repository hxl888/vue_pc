<template lang="html">
    <div class="tmzz">
            <div class="tmzz_div">
                <div class="tmzz_tu"></div>
                <ul class="tmzz_ul">
                    <p class="tmzz_ul_bg"></p>
                    <li class="tmzz_ul_list onbg"><a href="/" class="tmzz_ul_lista onbg">首页</a></li>
                    <li class="tmzz_ul_list"><a href="" target="_blank" class="tmzz_ul_lista">开放平台</a></li>
                    <!-- <li class="tmzz_ul_list ProductCenter">
                      <a href="javascript:" class="tmzz_ul_lista">产品中心</a>
                      <ol class="ProductCenterGrope">
                        <li class="ProductCenterGropeList"><a href="javascript:" class="ProductCenterGropeLista">冷链卡班</a></li>
                        <li class="ProductCenterGropeList"><a href="html/FoodSafety.html" class="ProductCenterGropeLista">食品安全</a></li>
                      </ol>
                    </li> -->
                    <li class="tmzz_ul_list"><a href="html/API.html" class="tmzz_ul_lista">帮助中心</a></li>
                </ul>
                <div class="tmzz_dl clearfix">
                  <div class="dl_left fl" @mouseover="logMouseover" @mouseout="logMousout">
                      <a href="javascript:void(0)" class="login" id="login">
                        <em class="cszt"></em>
                        <em class="hgzt"></em> 登录
                     </a>
                     <!-- 登录用隐藏面板start -->
                        <div  class="djdl clearfix" v-show='logbord'>
                            <!-- 白色三角start-->
                                <div class="tri_white">
                                    <span class="con"></span>
                                    <span class="firs"></span>
                                </div>
                            <!-- 白色三角end-->
                          <span class="gb" @click.prevent='login_go' cursor="pointer"></span>
                          <ol class="hynol">
                            <li class="hynolli" style="display:block">
                              <div class="donghuadiv">
                                <div class="divleft animated bounceInLeft">
                                </div>
                                <div class="divright">
                                </div>
                              </div>
                            </li>
                            <li class="hynolli">
                              <div class="donghuadiv">
                                <div class="divleft1">
                                </div>
                                <div class="divright1 animated flash infinite">
                                </div>
                              </div>
                            </li>
                            <li class="hynolli">
                              <div class="donghuadiv">
                                <div class="divleft2 animated bounceInLeft">
                                </div>
                                <div class="divright2 animated bounceInRight">
                                </div>
                              </div>
                            </li>
                            <li class="hynolli">
                              <div class="donghuadiv">
                                <div class="divleft3 animated bounceInDown">
                                </div>
                                <div class="divright3 animated bounceInUp">
                                </div>
                              </div>
                            </li>
                            <li class="hynolli">
                              <div class="donghuadiv">
                                <div class="divleft4 animated bounceInDown">
                                </div>
                                <div class="divright4 animated bounce">
                                </div>
                              </div>
                            </li>
                            <li class="hynolli">
                              <div class="donghuadiv">
                                <div class="divleft5 animated flash infinite">
                                </div>
                                <div class="divright5">
                                </div>
                              </div>
                            </li>
                          </ol>
                          <ul class="hynul">
                           <li class="hynulli"><a  @click.prevent="goMLogin">客户登录</a></li>
                           <li class="hynulli"><a href="" target="_blank">TMS登录</a></li>
                           <li class="hynulli" style="background:#8A8A8D;"><a href="#" style="cursor:default">伙伴登录</a></li>
                           <li class="hynulli"><a href="" target="_blank">DMS登录</a></li>
                           <li class="hynulli"><a @click.prevent="gologinyx">运营登录</a></li>
                           <li class="hynulli"><a href="">协同办公</a></li>
                          </ul>
                        </div>
                     <!-- 登录用隐藏面板end -->
                  </div>
                  <div class="dl_right fl">
                      <a href="javascript:void(0)" @click.prevent='registers'>
                        <em class="cszc"></em>
                        <em class="hgzc"></em>
                        注册
                      </a>
                  </div>
                </div>
            </div>
       </div>
</template>
<script>
    export default {
        data() {
            return {
                logbord: false,
                goyx: false
            };
        },
        methods: {
            login_go() {
                this.logbord = false;
            },
            registers() {
                this.$router.push({name: 'register'});
            },
            goMLogin() {
            //  客户登录跳转路由设置
                this.logMousout();
                this.$xeStore.setItem('userlogId', JSON.stringify({logId: '3000'}));
                this.$xeBus.$emit('logIdChange');
                this.$router.push({name: 'Login'});
            },
            gologinyx() {
            //  运营登录跳转路由设置
                this.logMousout();
                this.$xeStore.setItem('userlogId', JSON.stringify({logId: '1000'}));
                this.$xeBus.$emit('logIdChange');
                this.$router.push({name: 'Login'});
            },
            logMouseover() {
                this.logbord = true;
            },
            logMousout() {
                this.logbord = false;
            }
        }
    };
</script>
