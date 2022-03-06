import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  constructor(private renderer: Renderer2,private router:Router) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    
  }

  public loadScripts() {
    this.renderExternalScript('./assets/js/dashboard/dashboard-1.js').onload = () => {
    }
  }
  public renderExternalScript(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
    return script;
  }

}
