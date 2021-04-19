import Vue from 'vue';
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import _ from 'lodash';
const PDF = {};

PDF.install = function(Vue, options) {
    Vue.prototype.$pdf = function(num) {
        html2canvas(document.getElementById('printContainer'), {
            dpi: window.devicePixelRatio * 2,
            scale: 2,
        }).then(canvas => {
            console.log('A4页面');
            const [AWidth, AHeight] = [595.28, 841.89]; // a4;
            
            let { width: CWidth, height: CHeight } = canvas;
            console.log(CWidth);
            console.log(CHeight);
            // const PWidth = AWidth;
            // 一页PDF显示html生成的canvas高度
            const PHeight = (CWidth / AWidth) * AHeight;
            var leftHeight = CHeight;
            let position = 0;
            var imageWidth = 555.28;
            var imageHeight = 555.28 / CWidth * CHeight;


            const jpeg = canvas.toDataURL("image/jpeg", 1.0);
            const doc = new JsPDF("", "pt","a4");

            if (leftHeight < PHeight) {
                imageWidth = 555.28;
                imageHeight = 555.28 / CWidth * CHeight;
                doc.addImage(jpeg, 'JPEG', 20, 0, imageWidth, imageHeight);
            } else {
                while(leftHeight > 0) {
                    leftHeight -= PHeight;
                    doc.addImage(jpeg, 'JPEG', 20, position, imageWidth, imageHeight);
                    position -= AHeight;
                    if (leftHeight > 0) {
                        doc.addPage();
                    }
                }
            }
            doc.output('dataurlnewwindow');

            // if (CHeight < PHeight) {
            //     doc.addImage(jpeg, "JPEG", 0, 0, PWidth, PHeight);
            // } else {
            //     while(CHeight > 0) {
            //         doc.addImage(jpeg, "JPEG", 0 , position, PWidth, PHeight);
            //         CHeight -= PHeight;
            //         position -= AHeight;
            //         if (CHeight > 0) {
            //             doc.addPage();
            //         }
            //     }
            // }
            // doc.output('dataurlnewwindow');
        });

        // for (let j = 0; j < num; j++) {
        //     const newId = 'printPage' + j;
        //     const promiseResult = new Promise((resolve, reject) => {
        //         html2canvas(document.getElementById(newId), {
        //             dpi: window.devicePixelRatio * 2,
        //             scale: 2,
        //         }).then(canvas => {
        //             const jpeg = canvas.toDataURL("image/jpeg", 1.0);
        //             let { width: CWidth, height: CHeight } = canvas;
        //             const PWidth = AWidth;
        //             const PHeight = (AWidth / CWidth) * CHeight;
        //             doc.addImage(jpeg, "JPEG", 0 , j , PWidth, PHeight);
        //             if (j !== num-1) {
        //                 doc.addPage();
        //             }
        //             resolve();
        //         })
        //     }).catch((e) => {
        //         console.log('打印错误显示');
        //         console.log(e);
        //         reject();
        //     }); 
        //     dict.push(promiseResult);
        // }
        // Promise.all(dict).then(() => {
        //     doc.output('dataurlnewwindow');
        // });
        



    }
}

Vue.use(PDF);
export default PDF;