import { Component, OnInit } from '@angular/core';
import { Ship } from 'src/app/_models/ship';
import { ShipsService } from 'src/app/_services/ships.service';

@Component({
  selector: 'app-ship-list',
  templateUrl: './ship-list.component.html',
  styleUrls: ['./ship-list.component.css']
})
export class ShipListComponent implements OnInit {
  ships: Ship[] = [];

  constructor(private shipService: ShipsService) {}
  
  ngOnInit(): void {
    this.loadShips();
  }

  loadShips() {
    this.shipService.getShips().subscribe({
      next: ships => this.ships = ships
    })
  }
  

}
