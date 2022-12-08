import { SurveyReportComponent } from './components/survey-report/survey-report.component';

export const SURVEY_REPORT_COMPONENTS = [
    SurveyReportComponent,
];

export const SURVEY_REPORT_ROUTES = [
    {
        path: 'survey-report',
        component: SurveyReportComponent,
        data: {
            title: 'Survey Report',
            breadcrumb: 'Survey Report',
        },
    },
];

export * from './components/survey-report/survey-report.component';
