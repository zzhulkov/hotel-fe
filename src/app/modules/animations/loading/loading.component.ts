import {Component} from "@angular/core";

@Component({
  selector: 'app-loading-animation',
  template: '<div class="lds-dual-ring"></div>',
  styles: ['.lds-dual-ring {\n' +
  '  display: inline-block;\n' +
  '  width: 80px;\n' +
  '  height: 80px;\n' +
  '}\n' +
  '.lds-dual-ring:after {\n' +
  '  content: " ";\n' +
  '  display: block;\n' +
  '  width: 64px;\n' +
  '  height: 64px;\n' +
  '  margin: 8px;\n' +
  '  border-radius: 50%;\n' +
  '  border: 6px solid #023EBC;\n' +
  '  border-color: #023EBC transparent #023EBC transparent;\n' +
  '  animation: lds-dual-ring 1.2s linear infinite;\n' +
  '}\n' +
  '@keyframes lds-dual-ring {\n' +
  '  0% {\n' +
  '    transform: rotate(0deg);\n' +
  '  }\n' +
  '  100% {\n' +
  '    transform: rotate(360deg);\n' +
  '  }\n' +
  '}']
})
export class LoadingComponent {

}
