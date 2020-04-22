# HLComposer-HLExplorer
Despliegue del HyperledgerExplorer en HyperledgerComposer

En la instalacion de fabric 1.2.1 en vez de ejecturar ./startFabric.sh se ha ejectuado manualmente 

* Inicio de la red de fabric
* Incio del canal composercahnnel

```
cd fabric-dev-servers/fabric-scripts/hlfv12/composer/

docker-compose -f docker-compose.yml --build up -d

docker exec peer0.org1.example.com peer channel create -o orderer.example.com:7050 -c composerchannel -f /etc/hyperledger/configtx/composer-channel.tx

docker exec -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.example.com/msp" peer0.org1.example.com peer channel join -b composerchannel.block


```

En la instalacion del explorer

* El contenido e examples/supplychain/crypto es el mismo que fabric-dev-servers/fabric-scripts/hlfv12/composer/crypto-config
* Inicio de Hyperledger Explorer con /deploy_explorer.sh + directorio del proyecto + la red docker que levanta fabric

```
cd blockchain-explorer

./deploy_explorer.sh supplychain composer_default


```
