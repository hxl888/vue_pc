<template lang="html">
    <div class="wrap">
        <div class="zq-contern">
            <p>尊敬的用户</p>
            <p>对不起，您还未进行认证，暂无操作权限</p>
            <button class="zq-once">即刻认证，开启全新体验</button>
        </div>
    </div>
</template>
<script>
</script>
<style rel="stylesheet/scss" lang="scss" >
.wrap{
    width: 100%;
    height: 400px;
    margin-top: 15%;
    .zq-contern{
        p{
            width: 100%;
            line-height: 50px;
            font-size: 16px;
            text-align: center;
            display:block;
        }
    }
    .zq-once{
        background-color: #dddddd;
        font-size: 16px;
        display: block;
        width: 300px;
        height: 50px;
        line-height: 30px;
        text-align: center;
        margin:0 auto;
        border: 0;
    }
}  
</style>
