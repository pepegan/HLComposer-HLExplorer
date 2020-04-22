import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.supplychain.jamon{
   export abstract class Individuo extends Participant {
      id: string;
      nombre: string;
      email: string;
      telefono: string;
      direccion: Direccion;
   }
   export class Direccion {
      lineaDireccion1: string;
      lineaDireccion2: string;
      localidad: string;
      codigoPostal: string;
   }
   export class Ganadero extends Individuo {
      numeroLicencia: string;
   }
   export class PropietarioRestaurante extends Individuo {
      nombreRestaurante: string;
   }
   export class Jamon extends Asset {
      jamonId: string;
      peso: number;
      estatus_brida: ColorBridaJamon;
      tiempoCuracion: Date;
      propietario: Individuo;
   }
   export enum ColorBridaJamon {
      NEGRA,
      ROJA,
      VERDE,
      BLANCA,
   }
   export class VenderJamon extends Transaction {
      jamonId: Jamon;
      propietarioRestaurante: PropietarioRestaurante;
   }
   export class VentaDeJamon extends Event {
      detail: string;
   }
// }
