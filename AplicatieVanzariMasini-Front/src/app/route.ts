import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { ListsComponent } from "./lists/lists.component";
import { AuthGuard } from "./_guards/auth.guard";
import { MemberDetailComponent } from "./members/member-list/member-detail/member-detail.component";
import { MemberDetailResolver } from "./_resolver/member-detail.resolver";
import { MemberListResolver } from "./_resolver/member-list.resolver";
import { MemberEditComponent } from "./members/member-list/member-edit/member-edit.component";
import { MemberEditResolver } from "./_resolver/member-edit.resolver";
import { PreventUnsavedChanges } from "./_guards/prevent-unsaved-changes.guard";
import { ListResolver } from "./_resolver/lists.resolver";
import { MessagesResolver } from "./_resolver/messages.resolver";
import { AdminPanelComponent } from "./admin/admin-panel/admin-panel.component";
import { BrandsResolver } from "./_resolver/brands.resolver";
import { ModelsResolver } from "./_resolver/models.resolver";
import { ManufacturingDateResolver } from "./_resolver/manufacturingDates.resolver";
import { BodiesResolver } from "./_resolver/bodies.resolver";
import { FuelsResolver } from "./_resolver/fuels.resolver";
import { ModelVersionsResolver } from "./_resolver/modelVersions.resolver";
import { CountriesResolver } from "./_resolver/countries.resolver";
import { AnnouncesResolver } from "./_resolver/announces.resolver";
import { AnnounceDetailsPageComponent } from "./announce/announce-details-page/announce-details-page.component";
import { CarsResolver } from "./_resolver/cars.resolver";
import { AnnounceDetailResolver } from "./_resolver/announce-detail.resolver";
import { ContactComponent } from './contact/contact.component';
import { GearboxesResolver } from './_resolver/gearboxes.resolver';
import { PollutionRulesResolver } from './_resolver/pollutionRules.resolver';
import { TransmissionsResolver } from './_resolver/transmissions.resolver';

export const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    resolve: {
      announces: AnnouncesResolver,
      cars: CarsResolver,
      brands: BrandsResolver,
      models: ModelsResolver,
      modelVersions: ModelVersionsResolver,
      manufacturingDates: ManufacturingDateResolver,
      bodies: BodiesResolver,
      fuels: FuelsResolver,
      pollutionRules: PollutionRulesResolver,
      countries: CountriesResolver,
      gearboxes: GearboxesResolver,
      transmissions: TransmissionsResolver
    },
  },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      {
        path: "members",
        component: MemberListComponent,
        resolve: { users: MemberListResolver },
      },
      {
        path: "members/:id",
        component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver },
      },
      {
        path: "member/edit",
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsavedChanges],
      },
      {
        path: "messages",
        component: MessagesComponent,
        resolve: { messages: MessagesResolver },
      },
      {
        path: "lists",
        component: ListsComponent,
        resolve: { users: ListResolver },
      },
      {
        path: "admin",
        component: AdminPanelComponent,
        data: { roles: ["Admin"] },
      },
      {
        path: "contact",
        component: ContactComponent,
      },
      {
        path: "announce",
        component: AnnounceDetailsPageComponent,
        resolve: { announceDetail: AnnounceDetailResolver },

      },
      {
        path: "announce/:id",
        component: AnnounceDetailsPageComponent,
        resolve: { announceDetail: AnnounceDetailResolver },
      },
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];
