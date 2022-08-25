import 'dart:convert';
import 'dart:io';

import 'package:code_jam_two/viewGraphChart.dart';
import 'package:draw_graph/models/feature.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';
import 'package:intl/intl.dart';
import 'package:video_player/video_player.dart';

import 'HttpHelper.dart';


class properties {
  properties(this.date, this.targetPTO, this.targetSick);

  String date;
  String targetPTO;
  String targetSick;


}

class Person {
  Person(this.person, this.pto, this.sick);

  String person;

  List<String> pto;

  List<String> sick;


}

class Properties extends StatefulWidget {
  const Properties({Key? key}) : super(key: key);

  @override
  State<Properties> createState() => _PropertiesState();
}

class _PropertiesState extends State<Properties> {

  TextEditingController dateController = TextEditingController();
  TextEditingController targetPTOController = TextEditingController();
  TextEditingController targetSickController = TextEditingController();

  DateFormat formatter = DateFormat('yyyy-mm-dd');

  List<Person> people = [];

  properties props = properties("", "", "");






  List<Person> sendgetData() {
    HttpHelper.sendPost(
      body: props,
        onResponse: (response) {
          Map<String, dynamic> bodies = jsonDecode(response);
          print(bodies);
          try {
            bodies.forEach((key, value) {
              if (key == "people") {
                value.forEach((thing) {
                  setState(() {
                    List<String> holderPTO = [];
                    thing["PTO"].forEach((s) {
                      holderPTO.add(s.toString());
                    });
                    List<String> holderSICK = [];
                    thing["SICK"].forEach((s) {
                      holderSICK.add(s.toString());
                    });
                    people.add(
                      Person(
                        thing["NAME"],
                        holderPTO,
                        holderSICK,
                      ),
                    );
                  });
                });

                // print(people);
                throw "";
              }
            });
          }
          catch (e) {
            // print("hello we escaped");
            // print("got here");
            // print(people[0].person);
            // print(people[0].pto);
            // print(people[0].sick);
            Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (context) => viewData(payload: people, targetPTO: double.parse(targetPTOController.text)/4, targetSick: double.parse(targetSickController.text)/4)),
            );
          }
    });
    return people;
  }

  late VideoPlayerController controller;

  @override
  void initState() {
    loadVideoPlayer();
    super.initState();
  }

  loadVideoPlayer(){
    controller = VideoPlayerController.asset('assets/Loading.mp4');
    controller.addListener(() {
      setState(() {});
    });
    controller.initialize().then((value){
      setState(() {});
    });

  }


  bool video = false;



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: !video ? Padding(
          padding: const EdgeInsets.all(300.0),
          child: Column(
            children: [
              TextFormField(
                controller: dateController,
                onChanged: (value) {
                  props.date = dateController.text;
                },
                decoration: InputDecoration(
                    icon: Icon(Icons.calendar_today), //icon of text field
                    labelText: "Enter Date (form yyyy-mm-dd)", //label text of field
                ),

              ),
              TextFormField(
                controller: targetPTOController,
                onChanged: (value) {
                  props.targetPTO = targetPTOController.text;
                },
                decoration: InputDecoration(
                    icon: Icon(Icons.numbers), //icon of text field
                    labelText: "Enter Target PTO (number of days)" //label text of field
                ),


              ),
              TextFormField(
                controller: targetSickController,
                onChanged: (value) {
                  props.targetSick = targetSickController.text;
                },
                decoration: InputDecoration(
                    icon: Icon(Icons.numbers), //icon of text field
                    labelText: "Enter Target Sick Time (number of days)" //label text of field
                ),


              ),
              TextButton(
                  onPressed:
                  () async {
                    setState(() {
                      video = true;
                      controller.play();
                    });


                    await Future.delayed(Duration(seconds: 30));


                    List<Person> holder = await sendgetData();

                  },
                  child: Text("Submit")
              )
            ],
          ),
        ) : VideoPlayer(controller),
      ),
    );
  }
}
