import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShipsService } from 'src/app/_services/ships.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ship-delete',
  templateUrl: './ship-delete.component.html',
  styleUrls: ['./ship-delete.component.css']
})
export class ShipDeleteComponent implements OnInit {
  shipId: any;
  ship: any;

  constructor(private router: Router, private http: HttpClient, private shipService: ShipsService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.getShip();
  }

  cancel() {
    this.router.navigateByUrl('/ships');
  }

  getShip() {
    this.shipId = this.route.snapshot.paramMap.get('id');
    this.shipService.getShip(this.shipId).subscribe({
      next: response => this.ship = response
    })
  }

  deleteShip() {
    this.shipService.deleteShip(this.shipId).subscribe(() => this.router.navigateByUrl('/ships'));
  }

}
