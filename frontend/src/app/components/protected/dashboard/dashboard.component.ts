
/*
 * Copyright (c) 2023 Thomas Hansen - For license inquiries you can contact thomas@ainiro.io.
 */

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { BackendService } from 'src/app/services/backend.service';
import { DiagnosticsService } from 'src/app/services/diagnostics.service';
import moment from 'moment';
import { LogTypes, SystemReport } from './_models/dashboard.model';
import { ConfigureThemeDialog } from 'src/app/components/protected/dashboard/components/configure-theme/configure-theme-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OpenAIConfigurationDialogComponent } from '../common/openai/openai-configuration-dialog/openai-configuration-dialog.component';

/**
 * Primary dashboard component, displaying dashboard information, such as
 * charts, statistics, general information, etc.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  private _isRetrievingSystemReport = false;
  systemReport: any = null;
  systemReportDisplayable: any;
  logTypesChart: LogTypes[];
  chartsList: any = [];
  chartData: any = [];
  userIsRoot: boolean = undefined;
  isLoading: boolean = true;
  showInfoPanel: string = sessionStorage.getItem('infoPanel') || 'hide';
  userAsUsername: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private generalService: GeneralService,
    private dialog: MatDialog,
    private router: Router,
    private backendService: BackendService,
    private diagnosticsService: DiagnosticsService) { }

  ngOnInit() {

    if (!this.backendService.active.setupDone) {
      this.router.navigate(['/setup']);
      return;
    }
    this.waitForData();
    this.showInitDialog();
  }

  hidePanel() {

    this.showInfoPanel = 'hide';
    this.cdr.detectChanges();
    sessionStorage.setItem('infoPanel', this.showInfoPanel);
  }

  unsorted() { }

  /*
   * Private helper methods.
   */

  private waitForData() {

    if (this.backendService.active?.token?.in_role('root')) {
      this.getSystemReport();
      this.userIsRoot = (this.backendService.active?.token?.in_role('root'));
    } else {
      this.userAsUsername = this.backendService.active.username;
      this.isLoading = false;
    }
    this.cdr.detectChanges();
  }

  private getSystemReport() {

    this.cdr.markForCheck();

    if (this._isRetrievingSystemReport) {
      return;
    }
    this._isRetrievingSystemReport = true;

    this.diagnosticsService.getSystemReport().subscribe({
      next: (report: SystemReport[]) => {

        this.chartsList = [];
        this.chartData = {};
        this.systemReportDisplayable = null;

        // Allowing us to retrieve system report again.
        this._isRetrievingSystemReport = false;

        // Ensuring backend actually returned something.
        if (!report) {
          return;
        }

        // Binding model
        this.systemReport = report || [];

        // To display system reports in the html file.
        this.systemReportDisplayable = this.systemReport;
        this.logTypesChart = report['log_types'] || [];

        // Preparing data with variable key
        if (report["timeshifts"]) {
          Object.keys(report['timeshifts']).forEach((el: any) => {

            // Preparing chart list for setting user preferences
            this.chartsList.push({ name: report['timeshifts'][el].name, value: el, status: true });
            this.chartData[el] = { label: report['timeshifts'][el].items.map(x => { return moment(x.when).format("D. MMM") }), data: report['timeshifts'][el].items.map(x => { return x.count }), name: report['timeshifts'][el].name, description: report['timeshifts'][el].description };

          })
        }
        this.cdr.detectChanges();
        this.isLoading = false;

        // Checking if system has been configured with an OpenAI API key, and if not, displaying the modal window that asks the user.
        if (this.systemReport.has_openai === false) {
          this.dialog
            .open(OpenAIConfigurationDialogComponent, {
              width: '80vw',
              maxWidth: '550px',
              disableClose: true,
            })
            .afterClosed()
            .subscribe((result: any) => {

              if (result.configured) {

                this.systemReport.has_openai = true;

              } else {

                this.generalService.showFeedback('You cannot use Magic Cloud optimally without an OpenAI API account');
              }
            });
        }
      },
      error: (error: any) => {

        this.generalService.showFeedback(error?.error?.message ?? error, 'errorMessage');
        this._isRetrievingSystemReport = false;
      }
    });
  }

  private showInitDialog() {

    const configured = localStorage.getItem('configured');
    if (configured) {
      return;
    }
    const dialog = this.dialog.open(ConfigureThemeDialog, {
      width: '550px',
    });
    dialog.afterClosed().subscribe(() => {
      localStorage.setItem('configured', 'true');
    });
  }
}
