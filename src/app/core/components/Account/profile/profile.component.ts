import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountProfile, Family, Loan, LoanApplication } from '../../../../models/response/Administrator/AccountProfile';
import { AccountService } from '../../../services/account/account.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Account, Address } from '../../../../models/Account/Account';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-profile',
  imports: [MatTableModule, MatIconModule, CommonModule, MatExpansionModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  accountId : string = ''
  addressdisplayedColumns: string[] = ['purok', 'barangay', 'city', 'isPermanent'];
  familiesdisplayedColumns : string[] = ['name', 'contactNumber', 'relationshipTypeName'];
  ladisplayedColumns : string[] = ['principal', 'terms', 'daterequested' , 'status'];
  ldisplayedColumns : string[] = ['loanNumber', 'principal', 'termsInDays','dueDate', 'interestRate', 'status'];
  readonly panelOpenState = signal(false);

  


  profileData?: AccountProfile;
  addressDataSource = new MatTableDataSource<Address>();
  familiesDataSource = new MatTableDataSource<Family>();
  loanDataSource = new MatTableDataSource<Loan>();
  loanApplicationDataSource = new MatTableDataSource<LoanApplication>();

  constructor(private route : ActivatedRoute,  private accountService : AccountService){}

  ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('accountId') || '';
    console.log(this.accountId);
    if (this.accountId) {
      this.loadProfile();
    }

    this.loadProfile();
  }

  loadProfile() {
    this.accountService.checkProfileByAdmin(this.accountId).subscribe({
      next: (res) => {
        this.profileData = res;
        this.addressDataSource.data = res.addresses ?? [];
        this.familiesDataSource.data = res.families ?? [];
        this.loanApplicationDataSource.data = res.loanApplications ?? [];
        this.loanDataSource.data = res.loans ?? [];
        console.log('Profile loaded:', res);
      },
      error: (err) => {
        console.error('Error loading profile:', err);
      }
    });
  }

  hasLoanData(): boolean {
    console.log(this.loanDataSource?.data?.length);
    return this.loanDataSource?.data?.length > 0;
  }

  hasLoanApplicationData(): boolean
  {
    return this.loanApplicationDataSource.data.length > 0;
  }
}
