<template lang="html">
    <div class="xeUpload">
        <div class="upload-btn">
            <span>选择文件</span>
            <input type="file" :value='value' :name="name" @change='inputFileChange' ref='inputFile' accept="image/gif,image/jpeg,image/jpg,image/png">
        </div>
        <div class="upload-des">Logo图片建议尺寸:120*120/120*60</div>
    </div>
</template>

<script>
export default {
    name: 'xeUpload',
    data() {
        return {
            resultArr: []
        };
    },
    props: {
        name: {
            type: String,
            default: 'fileUpload'
        },
        value: {},
        maxSize: {
            type: Number,
            default: 700 * 1024 // 700 KB 对应的字节数
        }
    },
    methods: {
        inputFileChange(event) {
            let _this = this;
            const files = this.$refs.inputFile.files;
            if (files.length > 0) {
                // 单个图片
                console.log('单个图片');
                let file = files[0];
                // 接受 jpeg, jpg, png 类型的图片
                // if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) return;

                // 如果图片大于给定值则不上传
                if (file.size > _this.maxSize) {
                    // toPreviewer(result);
                    _this.$xeMessage.error(`图片大小已超过${_this.maxSize / 1024} KB`);
                    _this.$refs.inputFile.value = '';
                    return;
                };

                var reader = new FileReader();
                reader.onload = function() {
                    var result = this.result;
                    var img = new Image();
                    img.onload = function() {
                        var compressedDataUrl = _this.compressImg(img, file.type);
                        _this.resultArr.push(compressedDataUrl);
                        _this.$emit('inputFileChange', _this.resultArr);
                        _this.$emit('input', event.target.value);
                        img = null;
                        _this.resultArr = [];
                    };
                    img.src = result;
                };
                reader.readAsDataURL(file);
            }
            // this.$emit('inputFileChange', event);
        },
        clear() {
            this.$refs.inputFile.value = '';
            this.resultArr = [];
        },
        compressImg(img, fileType) {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let width = img.width;
            let height = img.height;
            canvas.width = width;
            canvas.height = height;
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, width, height);
            // 压缩
            var base64data = canvas.toDataURL(fileType, 0.75);
            canvas = ctx = null;
            return base64data;
        }
    }
};
</script>
