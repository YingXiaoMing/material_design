import Vue from 'vue';
import html2canvas from "html2canvas";
import JsPDF from "jspdf";

const PDF = {};

PDF.install = function(Vue, options) {
    Vue.prototype.$pdf = function(id) {
        // canvas_board
        html2canvas(document.getElementById(id)).then(canvas => {
            const [AWidth, AHeight] = [595.28, 841.89]; // a4;
            let position = 0;
            let { width: CWidth, height: CHeight } = canvas;
            const PWidth = AWidth;
            const PHeight = (AWidth / CWidth) * CHeight;
            const jpeg = canvas.toDataURL("image/jpeg", 1.0);
            const doc = new JsPDF("", "pt","a4");
            if (CHeight < PHeight) {
                doc.addImage(jpeg, "JPEG", 0, 0, PWidth, PHeight);
            } else {
                while (CHeight > 0) {
                    doc.addImage(jpeg, "JPEG", 0, position, PWidth, PHeight);
                    CHeight -= PHeight;
                    position -= AHeight;
                }
            }
            doc.output('dataurlnewwindow');
            // doc.output("datauri");
        });
    }
}
Vue.use(PDF);
export default PDF;