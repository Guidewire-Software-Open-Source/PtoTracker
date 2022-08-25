import 'dart:convert';
import 'dart:io';

import 'package:code_jam_two/propertiesinput.dart';
import 'package:http/http.dart' as http;

class HttpHelper {

  static void sendPost(
      {required properties body,
        Function(String)? onResponse,
        Function(http.Response)? onError}) async {

    http.post(Uri.parse("http://127.0.0.1:3000/"),
        body: "${body.date},${body.targetPTO},${body.targetSick}",
        headers: {
          HttpHeaders.contentTypeHeader: "application/json; charset=UTF-8",
        }).then((value) {

      if (value.statusCode == 200) {
        onResponse?.call(value.body);
      } else {
        onError?.call(value);
      }
    });
  }
}