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
exports.id = "app/api/auth/me/route";
exports.ids = ["app/api/auth/me/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/me/route.ts":
/*!**********************************!*\
  !*** ./app/api/auth/me/route.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n// app/api/auth/me/route.ts\n\n\n\nasync function GET(request) {\n    try {\n        // Get token from cookies\n        const token = request.cookies.get('auth_token')?.value;\n        if (!token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Not authenticated'\n            }, {\n                status: 401\n            });\n        }\n        try {\n            // Verify JWT token\n            const decoded = (0,jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__.verify)(token, process.env.JWT_SECRET || 'fallback_secret');\n            // Get user data\n            const user = _lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"].prepare('SELECT id, name, email, mobile FROM users WHERE id = ?').get(decoded.userId);\n            if (!user) {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: 'User not found'\n                }, {\n                    status: 404\n                });\n            }\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                user\n            }, {\n                status: 200\n            });\n        } catch (jwtError) {\n            console.error('JWT verification error:', jwtError);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Invalid token'\n            }, {\n                status: 401\n            });\n        }\n    } catch (error) {\n        console.error('Auth check error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Internal server error'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvbWUvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSwyQkFBMkI7QUFDNkI7QUFDVjtBQUNSO0FBRS9CLGVBQWVHLElBQUlDLE9BQW9CO0lBQzVDLElBQUk7UUFDRix5QkFBeUI7UUFDekIsTUFBTUMsUUFBUUQsUUFBUUUsT0FBTyxDQUFDQyxHQUFHLENBQUMsZUFBZUM7UUFFakQsSUFBSSxDQUFDSCxPQUFPO1lBQ1YsT0FBT0wscURBQVlBLENBQUNTLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBb0IsR0FDN0I7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLElBQUk7WUFDRixtQkFBbUI7WUFDbkIsTUFBTUMsVUFBVVYsb0RBQU1BLENBQ3BCRyxPQUNBUSxRQUFRQyxHQUFHLENBQUNDLFVBQVUsSUFBSTtZQUc1QixnQkFBZ0I7WUFDaEIsTUFBTUMsT0FBT2YsK0NBQUVBLENBQ1pnQixPQUFPLENBQUMsMERBQ1JWLEdBQUcsQ0FBQ0ssUUFBUU0sTUFBTTtZQUVyQixJQUFJLENBQUNGLE1BQU07Z0JBQ1QsT0FBT2hCLHFEQUFZQSxDQUFDUyxJQUFJLENBQ3RCO29CQUFFQyxPQUFPO2dCQUFpQixHQUMxQjtvQkFBRUMsUUFBUTtnQkFBSTtZQUVsQjtZQUVBLE9BQU9YLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7Z0JBQUVPO1lBQUssR0FBRztnQkFBRUwsUUFBUTtZQUFJO1FBQ25ELEVBQUUsT0FBT1EsVUFBVTtZQUNqQkMsUUFBUVYsS0FBSyxDQUFDLDJCQUEyQlM7WUFDekMsT0FBT25CLHFEQUFZQSxDQUFDUyxJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO1lBQWdCLEdBQ3pCO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7SUFDRixFQUFFLE9BQU9ELE9BQU87UUFDZFUsUUFBUVYsS0FBSyxDQUFDLHFCQUFxQkE7UUFDbkMsT0FBT1YscURBQVlBLENBQUNTLElBQUksQ0FDdEI7WUFBRUMsT0FBTztRQUF3QixHQUNqQztZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxhbnVzaFxcRGVza3RvcFxccHJvamVjdHNcXGRibXMgcHJvamVjdFxcUG9pbnQtQmFzZWQtUmVjeWNsaW5nLXN5c3RlbVxccG9pbnRiYXNlZFxcYXBwXFxhcGlcXGF1dGhcXG1lXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAvYXBpL2F1dGgvbWUvcm91dGUudHNcclxuaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcclxuaW1wb3J0IGRiLCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9saWIvZGInO1xyXG5pbXBvcnQgeyB2ZXJpZnkgfSBmcm9tICdqc29ud2VidG9rZW4nO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICAvLyBHZXQgdG9rZW4gZnJvbSBjb29raWVzXHJcbiAgICBjb25zdCB0b2tlbiA9IHJlcXVlc3QuY29va2llcy5nZXQoJ2F1dGhfdG9rZW4nKT8udmFsdWU7XHJcbiAgICBcclxuICAgIGlmICghdG9rZW4pIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6ICdOb3QgYXV0aGVudGljYXRlZCcgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAxIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBWZXJpZnkgSldUIHRva2VuXHJcbiAgICAgIGNvbnN0IGRlY29kZWQgPSB2ZXJpZnkoXHJcbiAgICAgICAgdG9rZW4sXHJcbiAgICAgICAgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCB8fCAnZmFsbGJhY2tfc2VjcmV0J1xyXG4gICAgICApIGFzIHsgdXNlcklkOiBudW1iZXIgfTtcclxuXHJcbiAgICAgIC8vIEdldCB1c2VyIGRhdGFcclxuICAgICAgY29uc3QgdXNlciA9IGRiXHJcbiAgICAgICAgLnByZXBhcmUoJ1NFTEVDVCBpZCwgbmFtZSwgZW1haWwsIG1vYmlsZSBGUk9NIHVzZXJzIFdIRVJFIGlkID0gPycpXHJcbiAgICAgICAgLmdldChkZWNvZGVkLnVzZXJJZCkgYXMgT21pdDxVc2VyLCAncGFzc3dvcmQnPiB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgIGlmICghdXNlcikge1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICAgIHsgZXJyb3I6ICdVc2VyIG5vdCBmb3VuZCcgfSxcclxuICAgICAgICAgIHsgc3RhdHVzOiA0MDQgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHVzZXIgfSwgeyBzdGF0dXM6IDIwMCB9KTtcclxuICAgIH0gY2F0Y2ggKGp3dEVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0pXVCB2ZXJpZmljYXRpb24gZXJyb3I6Jywgand0RXJyb3IpO1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBlcnJvcjogJ0ludmFsaWQgdG9rZW4nIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0F1dGggY2hlY2sgZXJyb3I6JywgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IGVycm9yOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJyB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfVxyXG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImRiIiwidmVyaWZ5IiwiR0VUIiwicmVxdWVzdCIsInRva2VuIiwiY29va2llcyIsImdldCIsInZhbHVlIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiZGVjb2RlZCIsInByb2Nlc3MiLCJlbnYiLCJKV1RfU0VDUkVUIiwidXNlciIsInByZXBhcmUiLCJ1c2VySWQiLCJqd3RFcnJvciIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/me/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   initializeDb: () => (/* binding */ initializeDb)\n/* harmony export */ });\n/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! better-sqlite3 */ \"better-sqlite3\");\n/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(better_sqlite3__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n// Ensure database directory exists\nconst dbDir = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(process.cwd(), 'database');\nif (!fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(dbDir)) {\n    fs__WEBPACK_IMPORTED_MODULE_2___default().mkdirSync(dbDir, {\n        recursive: true\n    });\n}\nconst dbPath = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(dbDir, 'eco-rewards.db');\nconst db = new (better_sqlite3__WEBPACK_IMPORTED_MODULE_0___default())(dbPath);\n// Initialize database tables\nfunction initializeDb() {\n    // Users table with points column\n    db.exec(`\n    CREATE TABLE IF NOT EXISTS users (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      name TEXT NOT NULL,\n      email TEXT UNIQUE NOT NULL,\n      mobile TEXT NOT NULL,\n      password TEXT NOT NULL,\n      points INTEGER DEFAULT 0,\n      created_at DATETIME DEFAULT CURRENT_TIMESTAMP\n    );\n  `);\n    // Purchases table\n    db.exec(`\n  CREATE TABLE IF NOT EXISTS purchases (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    user_id INTEGER NOT NULL,\n    total_amount REAL NOT NULL,\n    payment_method TEXT NOT NULL,\n    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\n    submission_location TEXT,\n    FOREIGN KEY (user_id) REFERENCES users(id)\n  );\n  `);\n    // Purchase_items table with is_reward column\n    db.exec(`\n    CREATE TABLE IF NOT EXISTS purchase_items (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      purchase_id INTEGER NOT NULL,\n      item_id TEXT NOT NULL,\n      name TEXT NOT NULL,\n      size TEXT NOT NULL,\n      quantity INTEGER NOT NULL,\n      price REAL NOT NULL,\n      image TEXT,\n      is_reward BOOLEAN DEFAULT 0,\n      FOREIGN KEY (purchase_id) REFERENCES purchases(id)\n    );\n  `);\n}\n// Initialize the database on module import\ninitializeDb();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (db);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBc0M7QUFDVjtBQUNSO0FBYXBCLG1DQUFtQztBQUNuQyxNQUFNRyxRQUFRRiwwQ0FBSUEsQ0FBQ0csUUFBUUMsR0FBRyxJQUFJO0FBQ2xDLElBQUksQ0FBQ0gsb0RBQWEsQ0FBQ0MsUUFBUTtJQUN6QkQsbURBQVksQ0FBQ0MsT0FBTztRQUFFSyxXQUFXO0lBQUs7QUFDeEM7QUFFQSxNQUFNQyxTQUFTUiwwQ0FBSUEsQ0FBQ0UsT0FBTztBQUMzQixNQUFNTyxLQUFLLElBQUlWLHVEQUFRQSxDQUFDUztBQUV4Qiw2QkFBNkI7QUFDdEIsU0FBU0U7SUFDZCxpQ0FBaUM7SUFDakNELEdBQUdFLElBQUksQ0FBQyxDQUFDOzs7Ozs7Ozs7O0VBVVQsQ0FBQztJQUVELGtCQUFrQjtJQUNsQkYsR0FBR0UsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7Ozs7RUFVVCxDQUFDO0lBRUQsNkNBQTZDO0lBQzdDRixHQUFHRSxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztFQWFULENBQUM7QUFDSDtBQUVBLDJDQUEyQztBQUMzQ0Q7QUFFQSxpRUFBZUQsRUFBRUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxhbnVzaFxcRGVza3RvcFxccHJvamVjdHNcXGRibXMgcHJvamVjdFxcUG9pbnQtQmFzZWQtUmVjeWNsaW5nLXN5c3RlbVxccG9pbnRiYXNlZFxcbGliXFxkYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGF0YWJhc2UgZnJvbSAnYmV0dGVyLXNxbGl0ZTMnO1xyXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCBmcyBmcm9tICdmcyc7XHJcblxyXG4vLyBEZWZpbmUgdXNlciB0eXBlXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlciB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgZW1haWw6IHN0cmluZztcclxuICBtb2JpbGU6IHN0cmluZztcclxuICBwYXNzd29yZDogc3RyaW5nO1xyXG4gIGNyZWF0ZWRfYXQ6IHN0cmluZztcclxuICBwb2ludHM6IG51bWJlcjtcclxufVxyXG5cclxuLy8gRW5zdXJlIGRhdGFiYXNlIGRpcmVjdG9yeSBleGlzdHNcclxuY29uc3QgZGJEaXIgPSBqb2luKHByb2Nlc3MuY3dkKCksICdkYXRhYmFzZScpO1xyXG5pZiAoIWZzLmV4aXN0c1N5bmMoZGJEaXIpKSB7XHJcbiAgZnMubWtkaXJTeW5jKGRiRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcclxufVxyXG5cclxuY29uc3QgZGJQYXRoID0gam9pbihkYkRpciwgJ2Vjby1yZXdhcmRzLmRiJyk7XHJcbmNvbnN0IGRiID0gbmV3IERhdGFiYXNlKGRiUGF0aCk7XHJcblxyXG4vLyBJbml0aWFsaXplIGRhdGFiYXNlIHRhYmxlc1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZURiKCkge1xyXG4gIC8vIFVzZXJzIHRhYmxlIHdpdGggcG9pbnRzIGNvbHVtblxyXG4gIGRiLmV4ZWMoYFxyXG4gICAgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgdXNlcnMgKFxyXG4gICAgICBpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsXHJcbiAgICAgIG5hbWUgVEVYVCBOT1QgTlVMTCxcclxuICAgICAgZW1haWwgVEVYVCBVTklRVUUgTk9UIE5VTEwsXHJcbiAgICAgIG1vYmlsZSBURVhUIE5PVCBOVUxMLFxyXG4gICAgICBwYXNzd29yZCBURVhUIE5PVCBOVUxMLFxyXG4gICAgICBwb2ludHMgSU5URUdFUiBERUZBVUxUIDAsXHJcbiAgICAgIGNyZWF0ZWRfYXQgREFURVRJTUUgREVGQVVMVCBDVVJSRU5UX1RJTUVTVEFNUFxyXG4gICAgKTtcclxuICBgKTtcclxuXHJcbiAgLy8gUHVyY2hhc2VzIHRhYmxlXHJcbiAgZGIuZXhlYyhgXHJcbiAgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgcHVyY2hhc2VzIChcclxuICAgIGlkIElOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCxcclxuICAgIHVzZXJfaWQgSU5URUdFUiBOT1QgTlVMTCxcclxuICAgIHRvdGFsX2Ftb3VudCBSRUFMIE5PVCBOVUxMLFxyXG4gICAgcGF5bWVudF9tZXRob2QgVEVYVCBOT1QgTlVMTCxcclxuICAgIGNyZWF0ZWRfYXQgREFURVRJTUUgREVGQVVMVCBDVVJSRU5UX1RJTUVTVEFNUCxcclxuICAgIHN1Ym1pc3Npb25fbG9jYXRpb24gVEVYVCxcclxuICAgIEZPUkVJR04gS0VZICh1c2VyX2lkKSBSRUZFUkVOQ0VTIHVzZXJzKGlkKVxyXG4gICk7XHJcbiAgYCk7XHJcblxyXG4gIC8vIFB1cmNoYXNlX2l0ZW1zIHRhYmxlIHdpdGggaXNfcmV3YXJkIGNvbHVtblxyXG4gIGRiLmV4ZWMoYFxyXG4gICAgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgcHVyY2hhc2VfaXRlbXMgKFxyXG4gICAgICBpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsXHJcbiAgICAgIHB1cmNoYXNlX2lkIElOVEVHRVIgTk9UIE5VTEwsXHJcbiAgICAgIGl0ZW1faWQgVEVYVCBOT1QgTlVMTCxcclxuICAgICAgbmFtZSBURVhUIE5PVCBOVUxMLFxyXG4gICAgICBzaXplIFRFWFQgTk9UIE5VTEwsXHJcbiAgICAgIHF1YW50aXR5IElOVEVHRVIgTk9UIE5VTEwsXHJcbiAgICAgIHByaWNlIFJFQUwgTk9UIE5VTEwsXHJcbiAgICAgIGltYWdlIFRFWFQsXHJcbiAgICAgIGlzX3Jld2FyZCBCT09MRUFOIERFRkFVTFQgMCxcclxuICAgICAgRk9SRUlHTiBLRVkgKHB1cmNoYXNlX2lkKSBSRUZFUkVOQ0VTIHB1cmNoYXNlcyhpZClcclxuICAgICk7XHJcbiAgYCk7XHJcbn1cclxuXHJcbi8vIEluaXRpYWxpemUgdGhlIGRhdGFiYXNlIG9uIG1vZHVsZSBpbXBvcnRcclxuaW5pdGlhbGl6ZURiKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkYjsiXSwibmFtZXMiOlsiRGF0YWJhc2UiLCJqb2luIiwiZnMiLCJkYkRpciIsInByb2Nlc3MiLCJjd2QiLCJleGlzdHNTeW5jIiwibWtkaXJTeW5jIiwicmVjdXJzaXZlIiwiZGJQYXRoIiwiZGIiLCJpbml0aWFsaXplRGIiLCJleGVjIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fme%2Froute&page=%2Fapi%2Fauth%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fme%2Froute.ts&appDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fme%2Froute&page=%2Fapi%2Fauth%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fme%2Froute.ts&appDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_anush_Desktop_projects_dbms_project_Point_Based_Recycling_system_pointbased_app_api_auth_me_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/me/route.ts */ \"(rsc)/./app/api/auth/me/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/me/route\",\n        pathname: \"/api/auth/me\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/me/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\anush\\\\Desktop\\\\projects\\\\dbms project\\\\Point-Based-Recycling-system\\\\pointbased\\\\app\\\\api\\\\auth\\\\me\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_anush_Desktop_projects_dbms_project_Point_Based_Recycling_system_pointbased_app_api_auth_me_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGbWUlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZtZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZtZSUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNhbnVzaCU1Q0Rlc2t0b3AlNUNwcm9qZWN0cyU1Q2RibXMlMjBwcm9qZWN0JTVDUG9pbnQtQmFzZWQtUmVjeWNsaW5nLXN5c3RlbSU1Q3BvaW50YmFzZWQlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q2FudXNoJTVDRGVza3RvcCU1Q3Byb2plY3RzJTVDZGJtcyUyMHByb2plY3QlNUNQb2ludC1CYXNlZC1SZWN5Y2xpbmctc3lzdGVtJTVDcG9pbnRiYXNlZCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDeUU7QUFDdEo7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGFudXNoXFxcXERlc2t0b3BcXFxccHJvamVjdHNcXFxcZGJtcyBwcm9qZWN0XFxcXFBvaW50LUJhc2VkLVJlY3ljbGluZy1zeXN0ZW1cXFxccG9pbnRiYXNlZFxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcbWVcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvbWUvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL21lXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL21lL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcYW51c2hcXFxcRGVza3RvcFxcXFxwcm9qZWN0c1xcXFxkYm1zIHByb2plY3RcXFxcUG9pbnQtQmFzZWQtUmVjeWNsaW5nLXN5c3RlbVxcXFxwb2ludGJhc2VkXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxtZVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fme%2Froute&page=%2Fapi%2Fauth%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fme%2Froute.ts&appDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/jws","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/safe-buffer","vendor-chunks/ms","vendor-chunks/lodash.once","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isinteger","vendor-chunks/lodash.isboolean","vendor-chunks/lodash.includes","vendor-chunks/jwa","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fme%2Froute&page=%2Fapi%2Fauth%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fme%2Froute.ts&appDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();