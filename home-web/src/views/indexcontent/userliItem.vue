<script type="text/ecmascript-6">
    import {fnScaleLinks} from 'xcms-common-plugins/src/filters/';
    export default {
        render(h) {
            console.log(fnScaleLinks);
            const items = this.datas.map((item, index) => {
                return `<li>
                            <a href=${fnScaleLinks(item.url)}>
                                <div>
                                    <i class="el-icon-picture"></i>
                                </div>
                                <p>${item.leafMenuName}</p>
                            </a>
                        </li>`;
            });
            return (
                <ul class="zm-con-item" domPropsInnerHTML={items.join('')}></ul>
            );
        },
        props: {
            datas: {
                type: Array
            }
        },
        filters: {
            fnScaleLinks
        }
    };
</script>
