// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

//import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol"; // BUSD contract

contract Maneki { 
    IERC20 BUSD; // must be store the ABI and contract address on front end
    //AggregatorV3Interface internal priceFeed;
    address public owner;
    uint256 dg=10**18;
 
     // NOTE : Enter this address during  deployemenT !!! Along with program address
    // Binanace BUSD 0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee BSC Test net
    // Binanace BUSD 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56 BSC Main Net
 
    constructor(address _BUSDAddr) {  
     // priceFeed = AggregatorV3Interface(0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526); // for BSC TEST Net
      //priceFeed = AggregatorV3Interface(0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE); // for BSC MAINNET
      BUSD = IERC20(_BUSDAddr);  
      owner=msg.sender;
      depoDest=owner;
      isReg[owner]=true;
      uname[owner]='MASTER';
      userCt = 1;
    }
    
    modifier onlyOwner {require(msg.sender==owner,'Not authorized');_;}

    receive() external payable {}
     address public depoDest=owner; 
    uint256 public userCt=0;   
    mapping(address => bool) public isReg; 
    mapping(address => string) public uname; // only one

       // get latest bnb price
    // function lstFeedLink() public view returns (uint256){
    // (,int price,,,)=priceFeed.latestRoundData();return uint256(price/100000000);}

    function rstDepoDest () external onlyOwner {
      depoDest=owner;
    }

    function sdepoDest (address _addr) external onlyOwner {
     require(_addr!=address(0), 'Data entry is empty');
     require(depoDest!=_addr,'Entry data is the same address');
     depoDest=_addr;
    }

    function BUSDBalance(address _addr) public view returns (uint) {
     return BUSD.balanceOf(_addr);
    } 

        function registerWallet(string memory _username) external  {
      require(isReg[msg.sender]==false, 'Address already registered');
      userCt++;
      isReg[msg.sender]=true;
      uname[msg.sender]=_username;
    } 

    uint256 public buyManekiCt=0; 
    mapping(uint256 => BUYMANEKI) public buyMANEKI; 
    struct BUYMANEKI {address addr;string uname; string pname;uint256 pvalue; uint256 pnumbers; uint256 bptotal; uint256 time;}

    mapping(address => uint256) public mybuyMAnekiCt;
    mapping(address => MYBUYMANEKI[]) public myBUYMANEKI;
    struct MYBUYMANEKI {uint256 i;} 

    function buyManeki(string memory _uname, string memory _pname, uint256 _pvalue, uint256 _pnumbers, uint256 _bptotal, uint256 _time) external { 
     require(BUSD.balanceOf(msg.sender) >= _bptotal,'Insufficient BUSD balance');
       require(depoDest!=address(0),'Depo destination addr is 0x00'); // default is owner
      BUSD.transferFrom(msg.sender,depoDest,_bptotal); // need BUSD approval on client side
      buyManekiCt++;
      BUYMANEKI memory _bp;
      _bp.addr = msg.sender;
      _bp.uname = _uname;
      _bp.pname = _pname;
      _bp.pvalue = _pvalue;
      _bp.bptotal = _bptotal;
      _bp.pnumbers = _pnumbers;
      _bp.time = _time;
      buyMANEKI[buyManekiCt] = _bp;
       MYBUYMANEKI memory _mp; 
       _mp.i=buyManekiCt;
       myBUYMANEKI[msg.sender].push(_mp); // push save
       mybuyMAnekiCt[msg.sender]++;
    } 

  
}