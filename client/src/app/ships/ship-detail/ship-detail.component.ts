import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Ship } from 'src/app/_models/ship';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ShipsService } from 'src/app/_services/ships.service';

@Component({
  selector: 'app-ship-detail',
  templateUrl: './ship-detail.component.html',
  styleUrls: ['./ship-detail.component.css']
})
export class ShipDetailComponent implements OnInit {
  shipId: any = this.route.snapshot.paramMap.get('id');
  ship: Ship | undefined;
  currentUser: any;
  shipForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  model: any = {};
  
  constructor(private shipService: ShipsService, 
    private route: ActivatedRoute,
    private accountService: AccountService, 
    private router: Router,
    private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.getCurrentUser();
    this.initializeForm();
    this.loadShip();
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe({
      next: user => this.currentUser = user
    })
  }

  initializeForm() {
    this.shipForm = this.fb.group({
      numero: ['', Validators.required],
      nom: ['', Validators.required],
      anneeConstruction: [''],
      longueur: ['', Validators.required],
      largeur: ['', Validators.required],
      tonnageBrut: [''],
      tonnageNet: ['']
      
    })
  }

  loadShip() {
    // this.shipId = this.route.snapshot.paramMap.get('id');
    
    if(this.shipId == null) {
      this.shipId = -1;
      return
    };
    this.shipService.getShip(this.shipId).subscribe({
      next: ship => this.ship = ship
    })
  }

  updateShip() {
    this.shipForm.value['userId'] = this.currentUser.userId;
    this.shipService.updateShip(this.shipForm.value, this.shipId).subscribe({
      next: () => {
        console.log('saved')
        this.router.navigateByUrl('/ships')
      }
    })
  }

}
