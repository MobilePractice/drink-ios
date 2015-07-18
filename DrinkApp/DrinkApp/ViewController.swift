//
//  ViewController.swift
//  DrinkApp
//
//  Created by m on 2015-07-09.
//  Copyright (c) 2015 Razorfish. All rights reserved.
//

import UIKit
class ViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {
    
    var tableView:UITableView?
    var stores = NSMutableArray()
    
    override func viewWillAppear(animated: Bool) {
        let frame:CGRect = CGRect(x: 0, y: 100, width: self.view.frame.width, height: self.view.frame.height-100)
        self.tableView = UITableView(frame: frame)
        self.tableView?.dataSource = self
        self.tableView?.delegate = self
        self.view.addSubview(self.tableView!)
        
        let btn = UIButton(frame: CGRect(x: 0, y: 25, width: self.view.frame.width, height: 50))
        btn.backgroundColor = UIColor.cyanColor()
        btn.setTitle("Give me stores!", forState: UIControlState.Normal)
        btn.addTarget(self, action: "getStores", forControlEvents: UIControlEvents.TouchUpInside)
        self.view.addSubview(btn)
    }
    
    func getStores() {
        RestApiManager.sharedInstance.getRandomUser { json in
            let results = json["result"]
            // println(results)
            for (index: String, subJson: JSON) in results {
                // println(index)
                // println(subJson)
                let store: AnyObject = subJson.object
                // println(store)
                self.stores.addObject(store)
                dispatch_async(dispatch_get_main_queue(),{
                    tableView?.reloadData()
                })
            }
        }
    }
    
    // table views
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.stores.count;
    }
    
    // height of each cell
    func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        return 60
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        var cell = tableView.dequeueReusableCellWithIdentifier("CELL") as? UITableViewCell
        
        if cell == nil {
            cell = UITableViewCell(style: UITableViewCellStyle.Value1, reuseIdentifier: "CELL")
        }
        
        let store:JSON =  JSON(self.stores[indexPath.row])
        
        let storeDistance = (store["distance_in_meters"].stringValue) + " meters away"
        
        cell!.textLabel?.text = store["name"].string
        cell!.detailTextLabel?.text = storeDistance
//        cell?.imageView?.image = UIImage(data: data!)
        
        return cell!
    }
}
