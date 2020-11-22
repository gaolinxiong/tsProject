import Vue from 'vue';
// 声明全局方法
declare module 'vue/types/vue' {
    interface Vue {
        $stat: {
            click(btn, score?: string, extensionData?: object): void;
        };
        $message: {
            clear();
            show(param: object);
            info(param: object);
            success(param: object);
            alert(param: object);
            error(param: object);
            warn(param: object);
            confirm(param: object);
            notify(param: object);
        };
        $gotoPath(path: string, param?: object);
        $gotoView(path: string, param?: object);
        $gotoURl(param: object);
        $toast: {
            show: (text: string | number, time?: number) => void;
            hide: Function;
        };
        $loading: {
            show: (desc: string | number) => void;
            hide: () => void;
        };
    }
}
