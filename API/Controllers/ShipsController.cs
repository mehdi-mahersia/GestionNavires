using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    // [Authorize]
    public class ShipsController : BaseApiController
    {
        private readonly DataContext _context;

        public ShipsController(DataContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ship>>> GetShips()
        {
            return await _context.Ships.ToListAsync();
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Ship>> GetShip(int id)
        {
            return await _context.Ships.FindAsync(id);
        }

        [HttpPost("add")] // POST: api/ships/add
        public async Task<ActionResult<bool>> Add(ShipDto shipDto)
        {
            if (await ShipNumberExists(shipDto.Numero)) return BadRequest("Le numéro de navire existe déjà");
            if (await ShipNameExists(shipDto.Nom)) return BadRequest("Le nom de navire existe déjà");

            var ship = new Ship
            {
                Numero = shipDto.Numero,
                Nom = shipDto.Nom,
                AnneeConstruction = shipDto.AnneeConstruction,
                Longueur = shipDto.Longueur,
                Largeur = shipDto.Largeur,
                TonnageBrut = shipDto.TonnageBrut,
                TonnageNet = shipDto.TonnageNet,
                CreatedAt = shipDto.CreatedAt,
                UserId = shipDto.UserId
            };

            _context.Ships.Add(ship);
            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [HttpPost("edit")] // POST: api/ships/edit
        public async Task<ActionResult<bool>> Edit(ShipDto shipDto, int shipId)
        {
            if (await ShipNumberExists(shipDto.Numero)) return BadRequest("Le numéro de navire existe déjà");
            if (await ShipNameExists(shipDto.Nom)) return BadRequest("Le nom de navire existe déjà");

            var ship = await _context.Ships.FindAsync(shipId);
            if (ship == null) return BadRequest();
            ship.Numero = shipDto.Numero;
            ship.Nom = shipDto.Nom;
            ship.AnneeConstruction = shipDto.AnneeConstruction;
            ship.Longueur = shipDto.Longueur;
            ship.Largeur = shipDto.Largeur;
            ship.TonnageBrut = shipDto.TonnageBrut;
            ship.TonnageNet = shipDto.TonnageNet;
            ship.CreatedAt = shipDto.CreatedAt;
            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {

            var ship = await _context.Ships.FindAsync(id);
            if (ship == null) return BadRequest();
            try
            {
                _context.Ships.Remove(ship);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }


        private async Task<bool> ShipNumberExists(string shipNumber)
        {
            return await _context.Ships.AnyAsync(x => x.Numero.ToLower() == shipNumber.ToLower());
        }

        private async Task<bool> ShipNameExists(string shipName)
        {
            return await _context.Ships.AnyAsync(x => x.Nom.ToLower() == shipName.ToLower());
        }
    }
}