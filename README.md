# sc-socal-credit
Social credit system for SwitchCraft

Accessible via `\credit`!

## ComputerCraft API

Install using `pastebin get TnKZzpZHWc socialapi.lua`

Basic usage
```
local socialapi = require('socialapi.lua');
socialapi:getCredit('Kc5f'); -- Returnes the current social credit of Kc5f as a number value
```

## REST API usage

### Get player's current social credit
```
GET https://scapi.kc5f.xyz/checkCredit?ign=${username}
```
 - Be sure to replace `${username}` with the username of the player you are retrieving credit
 
Response:
```
1000
````
