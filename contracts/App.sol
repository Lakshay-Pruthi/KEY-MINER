// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract App {
    
    struct data{
        string title;
        string key;
        string value;
        string Type;
        bool favourite;
    }
  
    mapping(address=>data[]) public Data; 
    mapping(address=>data[]) public dataBin; 
    
    function uploadData(string memory _title,string memory _key,string memory _value, string memory _type) external{
        data memory newData = data(_title,_key,_value,_type,false);
        Data[msg.sender].push(newData);
    }

    function addOrRemoveFromFavourites(uint _index) external {
        Data[msg.sender][_index].favourite =!(Data[msg.sender][_index].favourite);
    }

    function getData() external view returns(data[] memory){
        return Data[msg.sender];
    }

    function editData(uint _index,string memory _title,string memory _key,string memory _value) external {
        Data[msg.sender][_index].title = _title;
        Data[msg.sender][_index].key = _key;
        Data[msg.sender][_index].value = _value;
    }

    function deleteData(uint _index) external{
        data[] storage myArray = Data[msg.sender];
        dataBin[msg.sender].push(myArray[_index]);
        for (uint i = _index; i< myArray.length - 1; i++) {
            myArray[i] = myArray[i + 1];
        }
        myArray.pop();
    }

    function getBinData() view external returns(data[] memory) {
            return dataBin[msg.sender];
    }

    function restoreData(uint _index) external {
        data[] storage myArray = dataBin[msg.sender];
        Data[msg.sender].push(myArray[_index]);
        for (uint i = _index; i< myArray.length - 1; i++) {
            myArray[i] = myArray[i + 1];
        }
        myArray.pop();
    }


}
