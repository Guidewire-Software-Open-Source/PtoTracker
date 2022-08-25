import 'dart:math';

import 'package:code_jam_two/propertiesinput.dart';
import 'package:draw_graph/draw_graph.dart';
import 'package:draw_graph/models/feature.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class viewData extends StatefulWidget {
  const viewData({
    super.key,
    required this.payload,
    required this.targetPTO,
    required this.targetSick
});

  final List<Person> payload;
  final double targetPTO;
  final double targetSick;

  @override
  State<viewData> createState() => _viewDataState();
}

class _viewDataState extends State<viewData> {


  List<TableRow> getRows() {
    print("hello got to getrows hello");
    List<TableRow> returnlist = [
      TableRow(
        children: [
          TableCell(
            child: Column(
              children: [
                Text("Name",
                  style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold
                  ),),
              ],
            ),

          ),
          TableCell(
            child: Column(
              children: [
                Text("Quarter 1",
                  style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold
                  ),),
              ],
            ),

          ),
          TableCell(
            child: Column(
              children: [
                Text("Quarter 2",
                  style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold
                  ),),
              ],
            ),

          ),
          TableCell(
            child: Column(
              children: [
                Text("Quarter 3",
                  style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold
                  ),),
              ],
            ),

          ),
          TableCell(
            child: Column(
              children: [
                Text("Quarter 4",
                  style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold
            ),),
              ],
            ),

          )
        ]
      )
    ];
    widget.payload.forEach((element) {
      List<Widget> holderlist = [
        TableCell(
            verticalAlignment: TableCellVerticalAlignment.top,
            child: Padding(
              padding: const EdgeInsets.only(top: 10.0),
              child: Column(
                children: [
                  TextButton(
                    onPressed: () {
                      print("this is the fist element of pto");
                      print(element.pto[0]);
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => viewChartPerson(person: element, targetPTO: widget.targetPTO, targetSick: widget.targetSick)),
                      );
                    },
                    child: Tooltip(
                      message: "View Employee Graph",
                      child: Text(element.person,
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold
                      ),),
                    ),
                  ),
                ],
              ),
            )
        ),
      ];
      returnlist.add(
        TableRow(
          children: iterate(holderlist, element)
        ),
      );
    });
    return returnlist;

  }

  Color findColor(double actual, double target) {
    print(actual);
    print(target);
    if(actual > target*1.2){
      return Colors.red;
    }
    else if(actual < target*0.9){
      return Colors.yellow;
    }
    else {
      return Colors.green;
    }
  }

  List<Widget> iterate(List<Widget> listholder, Person element) {
    for(int i = 0; i < 4; ++i ) {
      listholder.add(
        TableCell(
            verticalAlignment: TableCellVerticalAlignment.top,
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Tooltip(
                    message: "Paid Time Off",
                    child: TextButton(
                        child: Text(element.pto[i].toString(),
                        style: TextStyle(
                          color: Colors.black,
                        ),),
                      onPressed: () {
                        // Navigator.push(
                        //   context,
                        //   MaterialPageRoute(
                        //       builder: (context) => viewChartPerson(person: element, targetPTO: widget.targetPTO, targetSick: widget.targetSick)),
                        // );
                      },
                      onHover: (bl) {
                          if(bl) {
                            if (findColor(double.parse(element.pto[i]),
                                widget.targetPTO) == Colors.green) {
                              handleHover(1);
                            }
                            if (findColor(double.parse(element.pto[i]),
                                widget.targetPTO) == Colors.yellow) {
                              handleHover(2);
                            }
                            if (findColor(double.parse(element.pto[i]),
                                widget.targetPTO) == Colors.red) {
                              handleHover(0);
                            }
                          } else {
                            handleHover(3);
                          }

                      },
                      style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all<Color>(findColor(double.parse(element.pto[i]), widget.targetPTO)),
                      ),

                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 8.0, right: 8.0, bottom: 8.0),
                  child: Tooltip(
                    message: "Sick Time",
                    child: TextButton(
                      child: Text(element.sick[i].toString(),
                        style: TextStyle(
                            color: Colors.black
                        ),),
                      onPressed: () {
                        // Navigator.push(
                        //   context,
                        //   MaterialPageRoute(
                        //       builder: (context) => viewChartPerson(person: element, targetPTO: widget.targetPTO, targetSick: widget.targetSick)),
                        // );
                      },
                      onHover: (bl) {
                        if(bl) {
                          if (findColor(double.parse(element.pto[i]),
                              widget.targetSick) == Colors.green) {
                            handleHover(1);
                          }
                          if (findColor(double.parse(element.pto[i]),
                              widget.targetSick) == Colors.yellow) {
                            handleHover(2);
                          }
                          if (findColor(double.parse(element.pto[i]),
                              widget.targetSick) == Colors.red) {
                            handleHover(0);
                          }
                        } else {
                    handleHover(3);
                    }

                      },
                      style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all<Color>(findColor(double.parse(element.sick[i]), widget.targetSick)),
                      ),
                    ),
                  ),
                ),
              ],
            )
        )
      );
    }
    return listholder;
  }

  bool hovered = false;
  String phrase = "I'm going to\nfire you if you\ndon't stop taking\ndays off";

  void handleHover(int state) {
    if(state == 0) { //red
      setState(() {
        hovered = true;
        phrase = "I'm going to\nfire you if you\ndon't stop taking\ndays off";
      });
    }
    if(state == 1){ //green
      setState(() {
        hovered = true;
        phrase = "You're safe\nfor now";
      });
    }
    if(state == 2){ //yellow
      setState(() {
        hovered = true;
        phrase = "Why do you\ncare so much?\nTake more days\noff.";
      });
    }
    if(state == 3) {
      setState(() {
        hovered = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          // Column is also a layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Invoke "debug painting" (press "p" in the console, choose the
          // "Toggle Debug Paint" action from the Flutter Inspector in Android
          // Studio, or the "Toggle Debug Paint" command in Visual Studio Code)
          // to see the wireframe for each widget.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Column(
              children: [
                Padding(
                  padding: EdgeInsets.symmetric(vertical: 64.0, horizontal: 180),
                  child:Table(
                    border: TableBorder.all(),
                    defaultVerticalAlignment: TableCellVerticalAlignment.middle,
                    children: getRows(),
    ),
                ),
                AnimatedPadding(
                  duration: Duration(milliseconds: 500),
                  padding: EdgeInsets.only(top: hovered ? 130.0 : 500),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Image(
                        image: AssetImage('assets/giraff.png'),
                      ),
                      Text(phrase,
                      style: TextStyle(
                        fontSize: 40,
                        fontWeight: FontWeight.bold
                      ),)
                    ],
                  ),
                )
                ],
            ),

          ],
        ),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}

class viewChartPerson extends StatefulWidget {
  const viewChartPerson({Key? key, required this.person, required this.targetPTO, required this.targetSick}) : super(key: key);

  final Person person;
  final double targetPTO;
  final double targetSick;

  @override
  State<viewChartPerson> createState() => _viewChartPersonState();
}

class _viewChartPersonState extends State<viewChartPerson> {

  late List<Feature> features;
  late int upperlim;

  @override
  void initState(){
    super.initState();
    double ptomax = [double.parse(widget.person.pto[0]), double.parse(widget.person.pto[1]), double.parse(widget.person.pto[2]), double.parse(widget.person.pto[3])].reduce(max);
    double sickmax = [double.parse(widget.person.sick[0]), double.parse(widget.person.sick[1]), double.parse(widget.person.sick[2]), double.parse(widget.person.sick[3])].reduce(max);
    setState(() {
      upperlim = [ptomax, sickmax].reduce(max).toInt();
    });
    features = [
      Feature(
        title: "Paid Time Off",
        color: Colors.blue,
        data: [double.parse(widget.person.pto[0])/ptomax, double.parse(widget.person.pto[1])/ptomax, double.parse(widget.person.pto[2])/ptomax, double.parse(widget.person.pto[3])/ptomax],
      ),
      Feature(
        title: "Sick time",
        color: Colors.orange,
        data: [double.parse(widget.person.sick[0])/sickmax, double.parse(widget.person.sick[1])/sickmax, double.parse(widget.person.sick[2])/sickmax, double.parse(widget.person.sick[3])/sickmax],
      ),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          // Column is also a layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Invoke "debug painting" (press "p" in the console, choose the
          // "Toggle Debug Paint" action from the Flutter Inspector in Android
          // Studio, or the "Toggle Debug Paint" command in Visual Studio Code)
          // to see the wireframe for each widget.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[

            LineGraph(
              features: features,
              size: Size(900, 700),
              labelX: ['Q1', 'Q2', 'Q3', 'Q4'],
              labelY: [(upperlim*0.2).toInt().toString(), (upperlim*0.4).toInt().toString(), (upperlim*0.6).toInt().toString(), (upperlim*0.8).toInt().toString(), upperlim.toString()],
              showDescription: true,
              graphColor: Colors.black,
              graphOpacity: 0.0,
              verticalFeatureDirection: true,
              descriptionHeight: 130,
            ),
          ],
        ),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}

