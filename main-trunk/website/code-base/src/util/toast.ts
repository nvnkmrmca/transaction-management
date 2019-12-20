import {ToastsStore as toast} from 'react-toasts';

 class Toast {
   static success = (msg: string) => {
       // Toast.show(msg, '#003300', '#FFFFFF');
       toast.success(msg);
    }
    static fail = (msg: string) => {
        // Toast.show(msg, '#b30000', '#FFFFFF');
        toast.error(msg);
    }
    static warn = (msg: string) => {
        // Toast.show(msg, '#e68a00', '#FFFFFF');
        toast.warning(msg);
    }
    static info = (msg: string) => {
        // Toast.show(msg, '#000080', '#FFFFFF');
        toast.info(msg);
    }
    static show = (msg: string, bgColor: string, textColor: string) => {

        toast.info(msg);
        
        /*
        // Add a Toast on screen.
        RNToast.show(msg, {
            duration: RNToast.durations.SHORT,
            position: RNToast.positions.TOP,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            backgroundColor: bgColor,
            textColor: textColor,
            onShow: () => {
                // calls on toast\`s appear animation start
            },
            onShown: () => {
                // calls on toast\`s appear animation end.
            },
            onHide: () => {
                // calls on toast\`s hide animation start.
            },
            onHidden: () => {
                // calls on toast\`s hide animation end.
            }
        });
        */
    }
};

export default Toast;