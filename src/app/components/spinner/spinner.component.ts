import { Component, OnInit } from '@angular/core';
import { UiComponentsModule } from '../../shared/ui-components.module';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  imports: [UiComponentsModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent implements OnInit {
  isLoading = false;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.spinnerService.isLoading.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
}
