/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/user/purchases/route";
exports.ids = ["app/api/user/purchases/route"];
exports.modules = {

/***/ "(rsc)/./app/api/user/purchases/route.ts":
/*!*****************************************!*\
  !*** ./app/api/user/purchases/route.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function GET(request) {\n    try {\n        const token = request.cookies.get('auth_token')?.value;\n        if (!token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Not authenticated'\n            }, {\n                status: 401\n            });\n        }\n        let userId;\n        try {\n            const decoded = (0,jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__.verify)(token, process.env.JWT_SECRET || 'fallback_secret');\n            userId = decoded.userId;\n        } catch  {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Invalid token'\n            }, {\n                status: 401\n            });\n        }\n        // Get purchases for user\n        const purchases = _lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"].prepare(`\n      SELECT id, total_amount, payment_method, created_at\n      FROM purchases\n      WHERE user_id = ?\n      ORDER BY created_at DESC\n    `).all(userId);\n        // For each purchase, get items\n        const purchaseItemsStmt = _lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"].prepare(`\n      SELECT item_id, name, size, quantity, price, is_reward\n      FROM purchase_items\n      WHERE purchase_id = ?\n    `);\n        const purchasesWithItems = purchases.map((purchase)=>{\n            const items = purchaseItemsStmt.all(purchase.id);\n            return items.length > 0 ? {\n                ...purchase,\n                items\n            } : null;\n        }).filter(Boolean);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            purchases: purchasesWithItems\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        console.error('Error fetching purchase history:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Internal server error'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VzZXIvcHVyY2hhc2VzL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXdEO0FBQ3BCO0FBQ0U7QUFFL0IsZUFBZUcsSUFBSUMsT0FBb0I7SUFDNUMsSUFBSTtRQUNGLE1BQU1DLFFBQVFELFFBQVFFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGVBQWVDO1FBQ2pELElBQUksQ0FBQ0gsT0FBTztZQUNWLE9BQU9MLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBb0IsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3pFO1FBRUEsSUFBSUM7UUFDSixJQUFJO1lBQ0YsTUFBTUMsVUFBVVgsb0RBQU1BLENBQUNHLE9BQU9TLFFBQVFDLEdBQUcsQ0FBQ0MsVUFBVSxJQUFJO1lBQ3hESixTQUFTQyxRQUFRRCxNQUFNO1FBQ3pCLEVBQUUsT0FBTTtZQUNOLE9BQU9aLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBZ0IsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3JFO1FBRUEseUJBQXlCO1FBQ3pCLE1BQU1NLFlBQVloQiwrQ0FBRUEsQ0FBQ2lCLE9BQU8sQ0FBQyxDQUFDOzs7OztJQUs5QixDQUFDLEVBQUVDLEdBQUcsQ0FBQ1A7UUFFUCwrQkFBK0I7UUFDL0IsTUFBTVEsb0JBQW9CbkIsK0NBQUVBLENBQUNpQixPQUFPLENBQUMsQ0FBQzs7OztJQUl0QyxDQUFDO1FBVUQsTUFBTUcscUJBQXFCLFVBQ3hCQyxHQUFHLENBQUMsQ0FBQ0M7WUFDSixNQUFNQyxRQUFRSixrQkFBa0JELEdBQUcsQ0FBQ0ksU0FBU0UsRUFBRTtZQUMvQyxPQUFPRCxNQUFNRSxNQUFNLEdBQUcsSUFBSTtnQkFBRSxHQUFHSCxRQUFRO2dCQUFFQztZQUFNLElBQUk7UUFDckQsR0FDQ0csTUFBTSxDQUFDQztRQUdWLE9BQU81QixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQUVRLFdBQVdJO1FBQW1CLEdBQUc7WUFBRVYsUUFBUTtRQUFJO0lBQzVFLEVBQUUsT0FBT0QsT0FBTztRQUNkbUIsUUFBUW5CLEtBQUssQ0FBQyxvQ0FBb0NBO1FBQ2xELE9BQU9WLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF3QixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUM3RTtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGFudXNoXFxEZXNrdG9wXFxwcm9qZWN0c1xcZGJtcyBwcm9qZWN0XFxQb2ludC1CYXNlZC1SZWN5Y2xpbmctc3lzdGVtXFxwb2ludGJhc2VkXFxhcHBcXGFwaVxcdXNlclxccHVyY2hhc2VzXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5pbXBvcnQgZGIgZnJvbSAnLi4vLi4vLi4vLi4vbGliL2RiJztcclxuaW1wb3J0IHsgdmVyaWZ5IH0gZnJvbSAnanNvbndlYnRva2VuJztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgdG9rZW4gPSByZXF1ZXN0LmNvb2tpZXMuZ2V0KCdhdXRoX3Rva2VuJyk/LnZhbHVlO1xyXG4gICAgaWYgKCF0b2tlbikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ05vdCBhdXRoZW50aWNhdGVkJyB9LCB7IHN0YXR1czogNDAxIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB1c2VySWQ6IG51bWJlcjtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRlY29kZWQgPSB2ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgJ2ZhbGxiYWNrX3NlY3JldCcpIGFzIHsgdXNlcklkOiBudW1iZXIgfTtcclxuICAgICAgdXNlcklkID0gZGVjb2RlZC51c2VySWQ7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdJbnZhbGlkIHRva2VuJyB9LCB7IHN0YXR1czogNDAxIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEdldCBwdXJjaGFzZXMgZm9yIHVzZXJcclxuICAgIGNvbnN0IHB1cmNoYXNlcyA9IGRiLnByZXBhcmUoYFxyXG4gICAgICBTRUxFQ1QgaWQsIHRvdGFsX2Ftb3VudCwgcGF5bWVudF9tZXRob2QsIGNyZWF0ZWRfYXRcclxuICAgICAgRlJPTSBwdXJjaGFzZXNcclxuICAgICAgV0hFUkUgdXNlcl9pZCA9ID9cclxuICAgICAgT1JERVIgQlkgY3JlYXRlZF9hdCBERVNDXHJcbiAgICBgKS5hbGwodXNlcklkKTtcclxuXHJcbiAgICAvLyBGb3IgZWFjaCBwdXJjaGFzZSwgZ2V0IGl0ZW1zXHJcbiAgICBjb25zdCBwdXJjaGFzZUl0ZW1zU3RtdCA9IGRiLnByZXBhcmUoYFxyXG4gICAgICBTRUxFQ1QgaXRlbV9pZCwgbmFtZSwgc2l6ZSwgcXVhbnRpdHksIHByaWNlLCBpc19yZXdhcmRcclxuICAgICAgRlJPTSBwdXJjaGFzZV9pdGVtc1xyXG4gICAgICBXSEVSRSBwdXJjaGFzZV9pZCA9ID9cclxuICAgIGApO1xyXG5cclxuICAgIGludGVyZmFjZSBQdXJjaGFzZSB7XHJcbiAgICAgIGlkOiBudW1iZXI7XHJcbiAgICAgIHRvdGFsX2Ftb3VudDogbnVtYmVyO1xyXG4gICAgICBwYXltZW50X21ldGhvZDogc3RyaW5nO1xyXG4gICAgICBjcmVhdGVkX2F0OiBzdHJpbmc7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHB1cmNoYXNlc1dpdGhJdGVtcyA9IChwdXJjaGFzZXMgYXMgUHVyY2hhc2VbXSlcclxuICAgICAgLm1hcCgocHVyY2hhc2UpID0+IHtcclxuICAgICAgICBjb25zdCBpdGVtcyA9IHB1cmNoYXNlSXRlbXNTdG10LmFsbChwdXJjaGFzZS5pZCk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1zLmxlbmd0aCA+IDAgPyB7IC4uLnB1cmNoYXNlLCBpdGVtcyB9IDogbnVsbDtcclxuICAgICAgfSlcclxuICAgICAgLmZpbHRlcihCb29sZWFuKTtcclxuXHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgcHVyY2hhc2VzOiBwdXJjaGFzZXNXaXRoSXRlbXMgfSwgeyBzdGF0dXM6IDIwMCB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgcHVyY2hhc2UgaGlzdG9yeTonLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0ludGVybmFsIHNlcnZlciBlcnJvcicgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImRiIiwidmVyaWZ5IiwiR0VUIiwicmVxdWVzdCIsInRva2VuIiwiY29va2llcyIsImdldCIsInZhbHVlIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwidXNlcklkIiwiZGVjb2RlZCIsInByb2Nlc3MiLCJlbnYiLCJKV1RfU0VDUkVUIiwicHVyY2hhc2VzIiwicHJlcGFyZSIsImFsbCIsInB1cmNoYXNlSXRlbXNTdG10IiwicHVyY2hhc2VzV2l0aEl0ZW1zIiwibWFwIiwicHVyY2hhc2UiLCJpdGVtcyIsImlkIiwibGVuZ3RoIiwiZmlsdGVyIiwiQm9vbGVhbiIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/user/purchases/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   initializeDb: () => (/* binding */ initializeDb)\n/* harmony export */ });\n/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! better-sqlite3 */ \"better-sqlite3\");\n/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(better_sqlite3__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n// Ensure database directory exists\nconst dbDir = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(process.cwd(), 'database');\nif (!fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(dbDir)) {\n    fs__WEBPACK_IMPORTED_MODULE_2___default().mkdirSync(dbDir, {\n        recursive: true\n    });\n}\nconst dbPath = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(dbDir, 'eco-rewards.db');\nconst db = new (better_sqlite3__WEBPACK_IMPORTED_MODULE_0___default())(dbPath);\n// Initialize database tables\nfunction initializeDb() {\n    // Users table with points column\n    db.exec(`\n    CREATE TABLE IF NOT EXISTS users (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      name TEXT NOT NULL,\n      email TEXT UNIQUE NOT NULL,\n      mobile TEXT NOT NULL,\n      password TEXT NOT NULL,\n      points INTEGER DEFAULT 0,\n      created_at DATETIME DEFAULT CURRENT_TIMESTAMP\n    );\n  `);\n    // Purchases table\n    db.exec(`\n  CREATE TABLE IF NOT EXISTS purchases (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    user_id INTEGER NOT NULL,\n    total_amount REAL NOT NULL,\n    payment_method TEXT NOT NULL,\n    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\n    submission_location TEXT,\n    FOREIGN KEY (user_id) REFERENCES users(id)\n  );\n  `);\n    // Purchase_items table with is_reward column\n    db.exec(`\n    CREATE TABLE IF NOT EXISTS purchase_items (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      purchase_id INTEGER NOT NULL,\n      item_id TEXT NOT NULL,\n      name TEXT NOT NULL,\n      size TEXT NOT NULL,\n      quantity INTEGER NOT NULL,\n      price REAL NOT NULL,\n      image TEXT,\n      is_reward BOOLEAN DEFAULT 0,\n      FOREIGN KEY (purchase_id) REFERENCES purchases(id)\n    );\n  `);\n}\n// Initialize the database on module import\ninitializeDb();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (db);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBc0M7QUFDVjtBQUNSO0FBYXBCLG1DQUFtQztBQUNuQyxNQUFNRyxRQUFRRiwwQ0FBSUEsQ0FBQ0csUUFBUUMsR0FBRyxJQUFJO0FBQ2xDLElBQUksQ0FBQ0gsb0RBQWEsQ0FBQ0MsUUFBUTtJQUN6QkQsbURBQVksQ0FBQ0MsT0FBTztRQUFFSyxXQUFXO0lBQUs7QUFDeEM7QUFFQSxNQUFNQyxTQUFTUiwwQ0FBSUEsQ0FBQ0UsT0FBTztBQUMzQixNQUFNTyxLQUFLLElBQUlWLHVEQUFRQSxDQUFDUztBQUV4Qiw2QkFBNkI7QUFDdEIsU0FBU0U7SUFDZCxpQ0FBaUM7SUFDakNELEdBQUdFLElBQUksQ0FBQyxDQUFDOzs7Ozs7Ozs7O0VBVVQsQ0FBQztJQUVELGtCQUFrQjtJQUNsQkYsR0FBR0UsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7Ozs7RUFVVCxDQUFDO0lBRUQsNkNBQTZDO0lBQzdDRixHQUFHRSxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztFQWFULENBQUM7QUFDSDtBQUVBLDJDQUEyQztBQUMzQ0Q7QUFFQSxpRUFBZUQsRUFBRUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxhbnVzaFxcRGVza3RvcFxccHJvamVjdHNcXGRibXMgcHJvamVjdFxcUG9pbnQtQmFzZWQtUmVjeWNsaW5nLXN5c3RlbVxccG9pbnRiYXNlZFxcbGliXFxkYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGF0YWJhc2UgZnJvbSAnYmV0dGVyLXNxbGl0ZTMnO1xyXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCBmcyBmcm9tICdmcyc7XHJcblxyXG4vLyBEZWZpbmUgdXNlciB0eXBlXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlciB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgZW1haWw6IHN0cmluZztcclxuICBtb2JpbGU6IHN0cmluZztcclxuICBwYXNzd29yZDogc3RyaW5nO1xyXG4gIGNyZWF0ZWRfYXQ6IHN0cmluZztcclxuICBwb2ludHM6IG51bWJlcjtcclxufVxyXG5cclxuLy8gRW5zdXJlIGRhdGFiYXNlIGRpcmVjdG9yeSBleGlzdHNcclxuY29uc3QgZGJEaXIgPSBqb2luKHByb2Nlc3MuY3dkKCksICdkYXRhYmFzZScpO1xyXG5pZiAoIWZzLmV4aXN0c1N5bmMoZGJEaXIpKSB7XHJcbiAgZnMubWtkaXJTeW5jKGRiRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcclxufVxyXG5cclxuY29uc3QgZGJQYXRoID0gam9pbihkYkRpciwgJ2Vjby1yZXdhcmRzLmRiJyk7XHJcbmNvbnN0IGRiID0gbmV3IERhdGFiYXNlKGRiUGF0aCk7XHJcblxyXG4vLyBJbml0aWFsaXplIGRhdGFiYXNlIHRhYmxlc1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZURiKCkge1xyXG4gIC8vIFVzZXJzIHRhYmxlIHdpdGggcG9pbnRzIGNvbHVtblxyXG4gIGRiLmV4ZWMoYFxyXG4gICAgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgdXNlcnMgKFxyXG4gICAgICBpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsXHJcbiAgICAgIG5hbWUgVEVYVCBOT1QgTlVMTCxcclxuICAgICAgZW1haWwgVEVYVCBVTklRVUUgTk9UIE5VTEwsXHJcbiAgICAgIG1vYmlsZSBURVhUIE5PVCBOVUxMLFxyXG4gICAgICBwYXNzd29yZCBURVhUIE5PVCBOVUxMLFxyXG4gICAgICBwb2ludHMgSU5URUdFUiBERUZBVUxUIDAsXHJcbiAgICAgIGNyZWF0ZWRfYXQgREFURVRJTUUgREVGQVVMVCBDVVJSRU5UX1RJTUVTVEFNUFxyXG4gICAgKTtcclxuICBgKTtcclxuXHJcbiAgLy8gUHVyY2hhc2VzIHRhYmxlXHJcbiAgZGIuZXhlYyhgXHJcbiAgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgcHVyY2hhc2VzIChcclxuICAgIGlkIElOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCxcclxuICAgIHVzZXJfaWQgSU5URUdFUiBOT1QgTlVMTCxcclxuICAgIHRvdGFsX2Ftb3VudCBSRUFMIE5PVCBOVUxMLFxyXG4gICAgcGF5bWVudF9tZXRob2QgVEVYVCBOT1QgTlVMTCxcclxuICAgIGNyZWF0ZWRfYXQgREFURVRJTUUgREVGQVVMVCBDVVJSRU5UX1RJTUVTVEFNUCxcclxuICAgIHN1Ym1pc3Npb25fbG9jYXRpb24gVEVYVCxcclxuICAgIEZPUkVJR04gS0VZICh1c2VyX2lkKSBSRUZFUkVOQ0VTIHVzZXJzKGlkKVxyXG4gICk7XHJcbiAgYCk7XHJcblxyXG4gIC8vIFB1cmNoYXNlX2l0ZW1zIHRhYmxlIHdpdGggaXNfcmV3YXJkIGNvbHVtblxyXG4gIGRiLmV4ZWMoYFxyXG4gICAgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgcHVyY2hhc2VfaXRlbXMgKFxyXG4gICAgICBpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsXHJcbiAgICAgIHB1cmNoYXNlX2lkIElOVEVHRVIgTk9UIE5VTEwsXHJcbiAgICAgIGl0ZW1faWQgVEVYVCBOT1QgTlVMTCxcclxuICAgICAgbmFtZSBURVhUIE5PVCBOVUxMLFxyXG4gICAgICBzaXplIFRFWFQgTk9UIE5VTEwsXHJcbiAgICAgIHF1YW50aXR5IElOVEVHRVIgTk9UIE5VTEwsXHJcbiAgICAgIHByaWNlIFJFQUwgTk9UIE5VTEwsXHJcbiAgICAgIGltYWdlIFRFWFQsXHJcbiAgICAgIGlzX3Jld2FyZCBCT09MRUFOIERFRkFVTFQgMCxcclxuICAgICAgRk9SRUlHTiBLRVkgKHB1cmNoYXNlX2lkKSBSRUZFUkVOQ0VTIHB1cmNoYXNlcyhpZClcclxuICAgICk7XHJcbiAgYCk7XHJcbn1cclxuXHJcbi8vIEluaXRpYWxpemUgdGhlIGRhdGFiYXNlIG9uIG1vZHVsZSBpbXBvcnRcclxuaW5pdGlhbGl6ZURiKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkYjsiXSwibmFtZXMiOlsiRGF0YWJhc2UiLCJqb2luIiwiZnMiLCJkYkRpciIsInByb2Nlc3MiLCJjd2QiLCJleGlzdHNTeW5jIiwibWtkaXJTeW5jIiwicmVjdXJzaXZlIiwiZGJQYXRoIiwiZGIiLCJpbml0aWFsaXplRGIiLCJleGVjIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Fpurchases%2Froute&page=%2Fapi%2Fuser%2Fpurchases%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Fpurchases%2Froute.ts&appDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Fpurchases%2Froute&page=%2Fapi%2Fuser%2Fpurchases%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Fpurchases%2Froute.ts&appDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_anush_Desktop_projects_dbms_project_Point_Based_Recycling_system_pointbased_app_api_user_purchases_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/user/purchases/route.ts */ \"(rsc)/./app/api/user/purchases/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/user/purchases/route\",\n        pathname: \"/api/user/purchases\",\n        filename: \"route\",\n        bundlePath: \"app/api/user/purchases/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\anush\\\\Desktop\\\\projects\\\\dbms project\\\\Point-Based-Recycling-system\\\\pointbased\\\\app\\\\api\\\\user\\\\purchases\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_anush_Desktop_projects_dbms_project_Point_Based_Recycling_system_pointbased_app_api_user_purchases_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VyJTJGcHVyY2hhc2VzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ1c2VyJTJGcHVyY2hhc2VzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdXNlciUyRnB1cmNoYXNlcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNhbnVzaCU1Q0Rlc2t0b3AlNUNwcm9qZWN0cyU1Q2RibXMlMjBwcm9qZWN0JTVDUG9pbnQtQmFzZWQtUmVjeWNsaW5nLXN5c3RlbSU1Q3BvaW50YmFzZWQlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q2FudXNoJTVDRGVza3RvcCU1Q3Byb2plY3RzJTVDZGJtcyUyMHByb2plY3QlNUNQb2ludC1CYXNlZC1SZWN5Y2xpbmctc3lzdGVtJTVDcG9pbnRiYXNlZCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDZ0Y7QUFDN0o7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGFudXNoXFxcXERlc2t0b3BcXFxccHJvamVjdHNcXFxcZGJtcyBwcm9qZWN0XFxcXFBvaW50LUJhc2VkLVJlY3ljbGluZy1zeXN0ZW1cXFxccG9pbnRiYXNlZFxcXFxhcHBcXFxcYXBpXFxcXHVzZXJcXFxccHVyY2hhc2VzXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS91c2VyL3B1cmNoYXNlcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3VzZXIvcHVyY2hhc2VzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS91c2VyL3B1cmNoYXNlcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGFudXNoXFxcXERlc2t0b3BcXFxccHJvamVjdHNcXFxcZGJtcyBwcm9qZWN0XFxcXFBvaW50LUJhc2VkLVJlY3ljbGluZy1zeXN0ZW1cXFxccG9pbnRiYXNlZFxcXFxhcHBcXFxcYXBpXFxcXHVzZXJcXFxccHVyY2hhc2VzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Fpurchases%2Froute&page=%2Fapi%2Fuser%2Fpurchases%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Fpurchases%2Froute.ts&appDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "better-sqlite3":
/*!*********************************!*\
  !*** external "better-sqlite3" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("better-sqlite3");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Fpurchases%2Froute&page=%2Fapi%2Fuser%2Fpurchases%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Fpurchases%2Froute.ts&appDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();