//
//  RestApiManager.swift
//  DrinkApp
//
//  Created by m on 2015-07-14.
//  Copyright (c) 2015 Razorfish. All rights reserved.
//

import Foundation


typealias ServiceResponse = (JSON, NSError?) -> Void

class RestApiManager: NSObject {
    static let sharedInstance = RestApiManager()
    
    // lcboapi.com/stores?geo=m6h+1p2
    let baseURL = "http://lcboapi.com/"
    
    func getStore(postalCode: String, onCompletion: (JSON) -> Void) {
        let route = baseURL + "stores?geo=" + postalCode

        makeHTTPGetRequest(route, onCompletion: { json, err in
            onCompletion(json as JSON)
        })
    }
    
    func makeHTTPGetRequest(path: String, onCompletion: ServiceResponse) {
        let request = NSMutableURLRequest(URL: NSURL(string: path)!)
        
        let session = NSURLSession.sharedSession()
        
        let task = session.dataTaskWithRequest(request, completionHandler: {data, response, error -> Void in
            let json:JSON = JSON(data: data)
            onCompletion(json, error)
        })
        task.resume()
    }
}