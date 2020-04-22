'use strict';

/**
 * Sample transaction
 * @param {org.supplychain.jamon.VenderJamon} venta
 * @transaction
 */
async function venderJamon(venta) {

    // set the new owner of the commodity
    venta.jamonId.propietario = venta.propietarioRestaurante;
    let assetRegistry = await getAssetRegistry('org.supplychain.jamon.Jamon');

    // emit a notification that a trade has occurred
    let notificacionVenta = getFactory().newEvent('org.supplychain.jamon', 'VentaDeJamon');
    notificacionVenta.detail = "El jamon ";
    emit(notificacionVenta);

    // persist the state of the commodity
    await assetRegistry.update(venta.jamonId);    
}
    
