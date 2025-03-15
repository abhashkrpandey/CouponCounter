# CouponCounter

This project is was done as an assigment 
<h2>Functionalities:</h2>
<ol>
  <li>Any user can without logging in can get a coupon</li>
  <li>Only admin can add/modify coupon</li>
  <li>Admin can enable and disable coupon and can see what coupon have been accesssed by which ipaddress/browsersession</li>
  <li>Since anyone can access coupon ,for security ip address tracking and session tracking is being done</li>
  <li>A cooldown of 1 hr have been applied so any user within this cooldown period can't access coupon again .</li>
  <li>Coupon is distributed in circular round-robin manner</li>
</ol>
<h2>Installation</h2>
<ol>
<li>Clone this repo</li>
  
```bash
  git clone https://github.com/abhashkrpandey/CouponCounter.git
 cd round-robin-application
```
<li>Install backend depedencies</li>

```bash
cd ./backend
npm install
```
<li>Create .env file in backend file and add environment variables</li>

```bash
MONGOURL="your-mongo-url"
PORT=3000
SECRETKEY="secret-key"
```
<li>Install frontend depedencies</li>

```bash
cd ./frontend
npm install
```
<li>Create .env file in frontend file and add environment variables</li>

```bash
VITE_BACKEND_URL="http://localhost:3000"
```

</ol>
<h2>Usage</h2>
<ol>
  <li>To run frontend</li>

  ```bash
 npm run dev
```

<li>To start server</li>


```bash
node index.js
```

The application will be avilable on `http://localhost:5173`
</ol>

